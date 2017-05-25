// pages/favorites/favorites.js
var app = getApp();
var favo_data = []
var proData = []
Page({
  data: {
    pros: []
  },
  onShareAppMessage: function () {
    return {
      title: '我正在使用赛尔无人机驾考宝典',
      desc: '真的很好用',
      path: '/pages/loginin/loginin'
    }
  },
  onLoad: function (options) {
    this.inquiryFavo();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //查询收藏
  inquiryFavo: function (fun) {
    var that = this;
    var _prosData = JSON.parse(JSON.stringify(app.globalData.prosData))
    app.sendMsg("TestFly/EselectEAllDatasFly.action", { "account": app.globalData.openId }, data => {
      favo_data = []
      proData = []
      var d = data.data;
      if (!(d instanceof Array)) {
        that.setData({
          pros: proData
        })
        return;
      }
      for (var i = 0; i < d.length; i++) {
        favo_data.push({ "id": parseInt(d[i].proid), "text": that.getText(parseInt(d[i].proid)) })
        proData.push(_prosData.x[parseInt(d[i].proid) - 1])
      }
      console.log('allData', proData)
      that.setData({
        pros: favo_data
      })
      if (fun)
        fun();
    })
  },
  getText: function (proId) {
    var p_text = app.globalData.prosData.x[proId - 1].text;
    p_text = p_text.replace(/<br\s*\/?>/gi, " ");
    if (p_text.length > 30) {
      p_text = p_text.substring(0, 30) + "...";
    }
    return p_text;
  },
  delPro: function (event) {
    var that = this;
    var id = event.target.dataset.proid;
    console.log('del_id', id)
    app.sendMsg("TestFly/deleteerror.action", { "proid": id, "account": app.globalData.openId })
    this.inquiryFavo();
  },
  showPro: function (event) {
    console.log("id", event.target.dataset.proid)
    app.globalData.commonPageData = {
      id: event.target.dataset.proid,
      pros: proData,
      name: '我的错题'
    }
    wx.navigateTo({
      url: '../commonPage/commonPage',
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  }
})
