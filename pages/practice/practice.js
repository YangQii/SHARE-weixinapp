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
//获取要做的题库信息
var randomsort = function (a, b) {
    return Math.random() > .5 ? -1 : 1
}
var getPros = function (_chooseOne, _chooseTwo, _random) {
    prosData = []
    var _prosData = JSON.parse(JSON.stringify(app.globalData.prosData))
    var baseData = {}
    __chooseOne = _chooseOne;
    switch (_chooseOne) {
        case 1:
            baseData = _prosData.sect1;
            break;
        case 2:
            baseData = _prosData.sect2;
            break;
        case 3:
            baseData = _prosData.sect3;
            break;
    }
    var baseData2 = []
    var type1Data = []
    baseData2 = baseData.type1
    type1Data = baseData2.concat(_prosData.sect4.type1)
    switch (_chooseTwo) {
        case 1:
            prosData = type1Data;
            break;
        case 2:
            baseData2 = baseData.type2;
            var type2Data = baseData2.concat(_prosData.sect4.type2)
            prosData = type1Data.concat(type2Data)
            break;
    }
    if (_random == "true") {
        prosData.sort(randomsort)
    }
}
// about跳转
const years = []
const months = []
const days = []

for (let i = 0; i <= 9; i++) {
    years.push(i)
}

for (let i = 0; i <= 9; i++) {
    months.push(i)
}

for (let i = 0; i <= 9; i++) {
    days.push(i)
}
Page({
    data: {
        favoIcon: favo_icon_b,
        butColorA: color_blank,
        butColorB: color_blank,
        butColorC: color_blank,
        keySolve: "zhengzai",
        show_answer_text: false,
        // 设置跳转
        years: years,
        year: 1,
        months: months,
        month: 1,
        days: days,
        day: 1,
        value: [1, 1, 1],

    },
    onPracticeTurnShow: false,
    show_answer_text: true,
    //显示和隐藏
    PracticeTurnShow: function () {
        if (this.data.onPracticeTurnShow) {
            this.setData({
                onPracticeTurnShow: false,
            })

        } else {
            this.setData({
                onPracticeTurnShow: true,
            })
        }
        if (this.data.show_answer_text) {
            this.setData({
                show_answer_text: true,
            })
        } else {
            this.setData({
                show_answer_text: false,
            })
        }
    },
    // 点击选项隐藏跳转
    examChangeBox: function () {
        if (this.data.onPracticeTurnShow) {
            this.setData({
                onPracticeTurnShow: false,
            })

        }
    },
    // 跳转
    onTurnBindChange: function (e) {
        const val = e.detail.value
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]]
        })
    },
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
        index=0
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
        getPros(parseInt(options.chooseNumOne), parseInt(options.chooseNumTwo), options.random)
        console.log(prosData)
        if (options.random == "true") {
            this.setData({
                chooseText: "随机练习"
            })
        } else {
            this.setData({
                chooseText: "顺序练习"
            })
        }
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
        console.log("favo_data", favo_data)
        console.log("prosDataId", prosData[index].proid)
        console.log("index", favo_data.indexOf(prosData[index].proid))
        if (favo_data.indexOf(parseInt(prosData[index].proid)) != -1) {
            return true;
        }
        return false;
    },
    // 上一个
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
        // 跳转后隐藏
        if (this.data.onPracticeTurnShow) {
            this.setData({
                onPracticeTurnShow: false,
            })

        }
    },
    toAimPro: function (pos) {
        index = pos - 1
        this.loadPro();
    }
})
// //arr[msg.id] = {answer:0,data:msg}