// pages/examresults/examresults.js
var app = getApp()
var color_green = '#00a0e9'
var color_red = '#e33535'
var color_gray = '#a9a9a9'
var _proData = []
function dateformat(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = Math.floor((second - hr * 3600) / 60);
  // 秒位
  var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = Math.floor((micro_second % 1000) / 10);
  return hr + ":" + min + ":" + sec;
}
var wrongPros = []
var wrongNum = 0;
var pross = []
Page({
  data: {
    examtime: '',
    score: 100,
    pros: pross
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    pross = []
    wrongNum = 0;
    _proData = app.globalData.examFinishData.prosData;
    var _time = app.globalData.examFinishData.examTime;
    for (var i = 0; i < _proData.length; i++) {
      var p = _proData[i];
      if (!p.m_answer || p.m_answer == 0) {
        pross.push({
          id: i + 1,
          color: color_gray
        })
        wrongNum++;
      } else {
        if (p.m_answer == p.answer) {
          pross.push({
            id: i + 1,
            color: color_green
          })
        } else {
          pross.push({
            id: i + 1,
            color: color_red
          })
          wrongPros.push(p)
          wrongNum++;
        }
      }
    }

    var s = Math.round((1 - (wrongNum / _proData.length)) * 100 * 100) / 100
    this.setData({
      score: s,
      examtime: dateformat(_time),
      pros: pross
    })
  },
  onShareAppMessage: function () {
    return {
      title: '我正在使用赛尔无人机驾考宝典',
      desc: '真的很好用',
      path: '/pages/loginin/loginin'
    }
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
  toPro: function (event) {
    console.log("event", event)
    var pid = event.target.dataset.proid - 1;
    app.globalData.commonPageData = {
      id: pid,
      pros: _proData,
      name: '题目回顾'
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
  },
  wrongPro: function () {
    app.globalData.commonPageData = {
      id: 0,
      pros: wrongPros,
      name: '回顾错题'
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
  },
  toHome: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  rePro: function () {
    wx.redirectTo({
      url: '../exam/exam?chooseNumOne=' + app.globalData.examFinishData.chooseOne + "&chooseNumTwo=" + app.globalData.examFinishData.chooseTwo,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  allPro: function () {
    app.globalData.commonPageData = {
      id: 0,
      pros: _proData,
      name: '题目回顾'
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