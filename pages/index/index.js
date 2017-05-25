//index.js
//获取应用实例
var app = getApp();
var chooseNumOne = 1;
var chooseNumTwo = 1;
var chooseType = -1;//顺序练习:0,随机练习:2,模拟考试:1
Page({
  data: {
    index: 0,
    Peoindex: 0,
    array: ['多旋翼', '固定翼', '直升机'],
    objectArray: [
      {
        id: 0,
        name: '多旋翼'
      },
      {
        id: 1,
        name: '固定翼'
      },
      {
        id: 2,
        name: '直升机'
      }
    ],
    Peoarray: ['驾驶员', '机长'],
    peoObjectArray: [
      {
        id: 0,
        name: '驾驶员'
      },
      {
        id: 1,
        name: '机长'
      }
    ],
  },
  on_choose_show: false,
  // picker选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    chooseNumOne = parseInt(e.detail.value) + 1;
    console.log(chooseNumOne)
  },
  bindPickerChangePeo: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Peoindex: e.detail.value
    })
    chooseNumTwo = parseInt(e.detail.value) + 1;
    console.log("twowei" + chooseNumTwo)
  },
  // 按钮
  peoPrimary: function () {
    console.log(chooseType + "\t" + chooseNumOne + "\t" + chooseNumTwo)
    switch (chooseType) {
      case 0:
        //改动
        if (this.data.on_choose_show) {
          this.setData({
            on_choose_show: false,
          })

        }
        wx.navigateTo({
          url: '../practice/practice?chooseNumOne=' + chooseNumOne + "&chooseNumTwo=" + chooseNumTwo + "&random=" + false,
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
        break;
      case 1:
        //改动
        if (this.data.on_choose_show) {
          this.setData({
            on_choose_show: false,
          })

        }
        wx.navigateTo({
          url: '../exam/exam?chooseNumOne=' + chooseNumOne + "&chooseNumTwo=" + chooseNumTwo,
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
        break;
      case 2:
        //改动
        if (this.data.on_choose_show) {
          this.setData({
            on_choose_show: false,
          })

        }
        wx.navigateTo({
          url: '../practice/practice?chooseNumOne=' + chooseNumOne + "&chooseNumTwo=" + chooseNumTwo + "&random=" + true,
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
        break;
        break;
      default:
        break;
    }
  },
  // 点击选择类型
  onChooseTurnPractice: function () {

    chooseType = 0;
    if (this.data.on_choose_show) {
      this.setData({
        on_choose_show: false,
      })
      chooseType = -1
    } else {
      this.setData({
        on_choose_show: true,
      })
    }
  },
  onChoose: function () {
    chooseType = 2;
    if (this.data.on_choose_show) {
      this.setData({
        on_choose_show: false,
      })
      chooseType = -1
    } else {
      this.setData({
        on_choose_show: true,
      })
    }
  },
  onChooseExam: function () {
    chooseType = 1;
    if (this.data.on_choose_show) {
      this.setData({
        on_choose_show: false,
      })
      chooseType = -1
    } else {
      this.setData({
        on_choose_show: true,
      })
    }
  },
  onFavo: function () {
    wx.navigateTo({
      url: '../favorites/favorites',
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
  onErr: function () {
    wx.navigateTo({
      url: '../wrong/wrong',
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
  onChapter: function () {
    wx.navigateTo({
      url: '../chapter/chapter',
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
  onAboutUs: function () {
    wx.navigateTo({
      url: '../aboutus/aboutus',
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
  onExamProcess: function () {
    wx.navigateTo({
      url: '../examprocess/examprocess',
    })
  }
})
