var app = getApp();
// var arr = app.globalData.proArray;
var favo_icon_b = "/images/ico_3_h.png";
var favo_icon_c = "/images/ico_31.png"
var color_right = "#00a0e9";
var color_err = "#eb3b3b";
var color_blank = "#fff";
var __chooseOne = 0;
//题库信息
var prosData = []
var index = 0;
var favo_data = []
// about跳转
// const years = []
// const months = []
// const days = []

// for (let i = 0; i <= 9; i++) {
//   years.push(i)
// }

// for (let i = 0; i <= 9; i++) {
//   months.push(i)
// }

// for (let i = 0; i <= 9; i++) {
//   days.push(i)
// }
Page({
  data: {
    //         proText: '',
    //         proId: '',
    //         proSum: 864,
    favoIcon: favo_icon_b,
    butColorA: color_blank,
    butColorB: color_blank,
    butColorC: color_blank,
    //         lastProId: 0,
    //         showGoto: false,
    keySolve: "zhengzai",
    show_answer_text: false,
    // 设置跳转
    // years: years,
    // year: 1,
    // months: months,
    // month: 1,
    // days: days,
    // day: 1,
    // value: [1, 1, 1],

  },
  // onPracticeTurnShow: false,
  // show_answer_text: true,
  //显示和隐藏
  // PracticeTurnShow: function () {
  //   if (this.data.onPracticeTurnShow) {
  //     this.setData({
  //       onPracticeTurnShow: false,
  //     })

  //   } else {
  //     this.setData({
  //       onPracticeTurnShow: true,
  //     })
  //   }
  //   if (this.data.show_answer_text) {
  //     this.setData({
  //       show_answer_text: true,
  //     })
  //   } else {
  //     this.setData({
  //       show_answer_text: false,
  //     })
  //   }
  // },
  // 点击选项隐藏跳转
  // examChangeBox: function () {
  //   if (this.data.onPracticeTurnShow) {
  //     this.setData({
  //       onPracticeTurnShow: false,
  //     })

  //   }
  // },
  // 跳转
  // onTurnBindChange: function (e) {
  //   const val = e.detail.value
  //   this.setData({
  //     year: this.data.years[val[0]],
  //     month: this.data.months[val[1]],
  //     day: this.data.days[val[2]]
  //   })
  // },
  //查询收藏
  inquiryFavo: function (fun) {
    app.sendMsg("TestFly/CselectCAllDatasFly.action", { "account": app.globalData.openId }, data => {
      favo_data = []
      var d = data.data;
      if (!(d instanceof Array))
        return;
      for (var i = 0; i < d.length; i++) {
        favo_data.push(parseInt(d[i].proid))
      }
      if (fun)
        fun();
    })
  },
  onLoad: function (options) {
    prosData = []
    console.log(options)
    var that = this;
    that.inquiryFavo(() => {
      if (that.checkFavo()) {
        that.setData({
          favoIcon: favo_icon_c
        })
      } else {
        that.setData({
          favoIcon: favo_icon_b
        })
      }

    })
    console.log(app.globalData.commonPageData)
    if (app.globalData.commonPageData.pros) {
      prosData = app.globalData.commonPageData.pros;
    } else {
      prosData = []
    }
    if (app.globalData.commonPageData.name) {
      this.setData({
        chooseText: app.globalData.commonPageData.name
      })
    }
    index = parseInt(app.globalData.commonPageData.id)
    this.setData({
      proSum: prosData.length
    })
    this.loadPro()
  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: '我正在使用赛尔无人机驾考宝典',
      desc: '真的很好用',
      path: '/pages/loginin/loginin'
    }
  },
  loadPro: function () {
    console.log("index", index)
    console.log("proData", prosData[index])
    this.setData({
      proId: index + 1,
      show_answer_text: false,
      proText: prosData[index].text.replace(/<br\s*\/?>/gi, "\r\n"),
      butColorA: color_blank,
      butColorB: color_blank,
      butColorC: color_blank
    })
    if (prosData[index].m_answer) {
      this.checkAnswer()
    }
    if (this.checkFavo()) {
      this.setData({
        favoIcon: favo_icon_c
      })
    } else {
      this.setData({
        favoIcon: favo_icon_b
      })
    }

  },
  //检查收藏
  checkFavo: function () {
    if (favo_data.indexOf(parseInt(prosData[index].proid)) != -1) {
      return true;
    }
    return false;
  },
  onLast: function () {
    if (index > 0) {
      index--;
      this.loadPro()
    }
    if (this.data.onPracticeTurnShow) {
      this.setData({
        onPracticeTurnShow: false,
      })
    }
  },
  onNext: function () {
    if (index < (prosData.length - 1)) {
      index++;
      this.loadPro()
    }
    if (this.data.onPracticeTurnShow) {
      this.setData({
        onPracticeTurnShow: false,
      })

    }
  },
  showAnswerText: function () {
    this.setData({
      show_answer_text: true,
      keySolve: prosData[index].answer_text.replace(/<br\s*\/?>/gi, "\r\n")
    })
  },
  checkAnswer: function () {
    this.setData({
      butColorA: color_blank,
      butColorB: color_blank,
      butColorC: color_blank
    })
    if (!prosData[index].m_answer)
      return;
    if (prosData[index].m_answer == prosData[index].answer) {
      switch (prosData[index].m_answer) {
        case 1:
          this.setData({
            butColorA: color_right
          })
          break;
        case 2:
          this.setData({
            butColorB: color_right
          })
          break;
        case 3:
          this.setData({
            butColorC: color_right
          })
          break;
      }

    }
    else {
      switch (prosData[index].m_answer) {
        case 1:
          this.setData({
            butColorA: color_err
          })
          break;
        case 2:
          this.setData({
            butColorB: color_err
          })
          break;
        case 3:
          this.setData({
            butColorC: color_err
          })
          break;
      }
      switch (parseInt(prosData[index].answer)) {
        case 1:
          this.setData({
            butColorA: color_right
          })
          break;
        case 2:
          this.setData({
            butColorB: color_right
          })
          break;
        case 3:
          this.setData({
            butColorC: color_right
          })
          break;
      }
    }
    this.showAnswerText()
  },
  onA: function () {
    prosData[index].m_answer = 1//自己的答案
    this.checkAnswer()
  },
  onB: function () {
    prosData[index].m_answer = 2//自己的答案
    this.checkAnswer()
  },
  onC: function () {
    prosData[index].m_answer = 3//自己的答案
    this.checkAnswer()
  },
  onFavo: function () {
    var that = this;
    app.sendMsg("TestFly/savecollection.action", { "proid": prosData[index].proid, "account": app.globalData.openId, "section_1": __chooseOne })

    that.inquiryFavo(() => {
      if (that.checkFavo()) {
        that.setData({
          favoIcon: favo_icon_c
        })
      } else {
        that.setData({
          favoIcon: favo_icon_b
        })
      }

    })
    if (this.data.onPracticeTurnShow) {
      this.setData({
        onPracticeTurnShow: false,
      })

    }
  },
  // 目标题目跳转
  peoPrimary: function () {
    var that = this;
    console.log(that)
    var _year = that.data.year
    var _month = that.data.month;
    var _day = that.data.day;
    var _data = parseInt(_year) * 100 + parseInt(_month) * 10 + parseInt(_day)
    console.log(_data)
    if (_data > prosData.length) {
      wx.showToast({
        title: "没有该题号"
      })
      return;
    }
    this.toAimPro(_data)
  },
  toAimPro: function (pos) {
    index = pos - 1
    this.loadPro();
  },
  onUnload: function () {
    app.globalData.commonPageData = {}
  }
})
// //arr[msg.id] = {answer:0,data:msg}