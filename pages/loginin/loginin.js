var app = getApp()
var isLogin = false;
var _sort = function (a, b) {
  if (parseInt(a.proid) > parseInt(b.proid))
    return 1
  else
    return -1
}
Page({
  data: {
    userInfo: {},
    butText: '授权登录小程序'
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: '我正在使用赛尔无人机驾考宝典',
      desc: '真的很好用',
      path: '/pages/loginin/loginin'
    }
  },
  shareLogin: function () {
    if (this.data.butText != '授权登录小程序')
      return;
    var that = this;
    that.setData({
      butText: '正在登录'
    })
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (r) {
            that.login(res.code, r.encryptedData, r.iv)
          },
          fail: function () {
            that.setData({
              butText: '授权登录小程序'
            })
          }

        })

        // success
      },
      fail: function () {
        // fail
        that.setData({
          butText: '授权登录小程序'
        })
      },
      complete: function () {
        // complete

      }
    })
  },
  login: function (code, encryptedData, iv) {
    var that = this;

    console.log('code:'+code);
    console.log('encryptedData:'+encryptedData);
    console.log('iv:'+iv);
    app.sendMsg("TestFly/login.action", { 'code': code, 'encryptedData': encryptedData, 'iv': iv }, res => {
      var resData = res.data;
      if (resData.unionid == "err") {
        that.setData({
          butText: '授权登录小程序'
        })
        return;
      }
      app.globalData.openId = resData.unionid;
      console.log('unionid:'+resData.unionid);
      console.log(res);
      that.setData({
        butText: '正在加载题库信息'
      })
      //获取缓存中的pros
      var data = wx.getStorageSync('pros')
      //初始化版本号为0.0.0
      var version = "0.0.0";

      if (data) {
        //如果获取的数据存在说明版本号存在，获取题库中的版本号给version
        version = data.version;
      }
      //发送检查更新请求，将版本号发过去
      app.sendMsg("TestFly/WxUpDates.action", { 'version': version }, d1 => {
        console.log("d1", d1)
        //返回的数据.data才是服务器要给咱的数据
        var d1data = d1.data;
        if (!d1data.check) {
          that.setData({
            butText: '授权登录小程序'
          })
          return

        }
        //如果check==true则说明需要更新
        if (d1data.check == 'true') {
          //发送更新请求,地址为检查更新请求的返回数据的src
          app.sendMsg(d1data.src, {}, d2 => {
            console.log("d2", d2)
            if (!d2.data) {
              wx.showToast({
                title: "未获取到题库，请稍后重试"
              })
              that.setData({
                butText: '授权登录小程序'
              })
              return
            } else {
              //跳转到主页面
              var ddata = that.delData(d2.data);

              wx.setStorageSync('pros', ddata)

              app.globalData.prosData = ddata

              that.toIndex()

            }

          }, () => {
            //如果请求失败则取消登录
            that.setData({
              butText: '授权登录小程序'
            })
          })
        } else if (d1data.check == 'false') {
          //check==false则说明不需要更新,直接跳转主页面
          app.globalData.prosData = data
          that.toIndex()
        }

      }, () => {
        //检查更新请求失败,直接跳转到主页面
        that.setData({
          butText: '授权登录小程序'
        })
      })

    }, () => {
      that.setData({
        butText: '授权登录小程序'
      })
    }
    )
  },
  toIndex: function () {
    console.log(app.globalData.prosData)
    wx.redirectTo({
      url: '../index/index',
      success: function (res) {
        // success

      },
      fail: function () {
        // fail
        that.setData({
          butText: '授权登录小程序'
        })
      },
      complete: function () {
        // complete
      }
    })
  },
  delData: function (proData) {
    console.log("pro", proData)
    console.log("d", proData.sect1.type1)
    var xdata = proData.sect1.type1;
    xdata = xdata.concat(proData.sect1.type2)
    xdata = xdata.concat(proData.sect2.type1)
    xdata = xdata.concat(proData.sect2.type2)
    xdata = xdata.concat(proData.sect3.type1)
    xdata = xdata.concat(proData.sect3.type2)
    xdata = xdata.concat(proData.sect4.type1)
    xdata = xdata.concat(proData.sect4.type2)
    xdata.sort(_sort)

    proData.x = xdata;
    var n = 1;
    for (var i = 0; i < xdata.length; i++) {
      var nn = xdata[i].proid - i;
      if (nn > n) {
        n = nn;
        console.log(i)
      }
    }


    return proData;
  }
})