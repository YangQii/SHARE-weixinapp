//app.js
App({
  onLaunch: function () {
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (ress) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    prosData: {},
    openId: "",
    commonPageData: {},
    examFinishData: {}
  }
  ,
  sendMsg: function (_url, _data, _suc, _fail, _com) {
    wx.request({
      url: 'https://aopa.shareuavtec.com/' + _url,
      data: _data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        if (_suc)
          _suc(res)
        // success
      },
      fail: function () {
        if (_fail)
          _fail()
        // fail
      },
      complete: function () {
        // complete
        if (_com)
          _com()
      }
    })
  }
})