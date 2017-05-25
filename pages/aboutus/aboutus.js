// pages/aboutus/aboutus.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onShareAppMessage: function () {
        return {
            title: '我正在使用赛尔无人机驾考宝典',
            desc: '真的很好用',
            path: '/pages/loginin/loginin'
        }
    },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  openWeb:function(){
    wx.showToast({
      title:"请在浏览器中打开"
    })
  },
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '0531-87214610',
      success: function(res) {
        // success
      }
    })
  }
})