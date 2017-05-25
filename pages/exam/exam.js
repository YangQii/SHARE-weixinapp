var app = getApp();
var favo_icon_b = "/images/ico_3_h.png";
var favo_icon_c = "/images/ico_31.png"

var color_right = "#00a0e9";
var color_err = "#eb3b3b";
var color_blank = "#fff";

var prosData = []
var index = 0;
var favo_data = []
var __chooseOne = 0
var __chooseTwo = 0
var is_wait = false;

var pro_sum = 100;
var color_select = '#00a1e9';
var color_blank = '#fff'
var total_micro_second = 1000 * 60 * 60;
var randomsort = function (a, b) {
    return Math.random() > .5 ? -1 : 1
}
var getPros = function (_chooseOne, _chooseTwo, _random) {
    prosData = []
    var _prosData = JSON.parse(JSON.stringify(app.globalData.prosData))
    var baseData = {}
    __chooseOne = _chooseOne;
    __chooseTwo = _chooseTwo;
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
    prosData = prosData.slice(0, pro_sum);
    console.log(prosData)
}

/* 毫秒级倒计时 */
function countdown(that) {
    // 渲染倒计时时钟
    that.setData({
        exam_time: dateformat(total_micro_second)
    });

    if (total_micro_second <= 0) {
        that.finishExam();
        // timeout则跳出递归
        return;
    }
    setTimeout(function () {
        // 放在最后--
        total_micro_second -= 10;
        countdown(that);
    }
        , 10)
}

// 时间格式化输出，如3:25:19 86。每10ms都会调用一次
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

// about跳转
const years = []
const months = []
const days = []

for (let i = 0; i <= 1; i++) {
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
        // 设置跳转
        favoIcon: favo_icon_b,
        years: years,
        year: 0,
        months: months,
        month: 1,
        days: days,
        day: 1,
        value: [0, 1, 1],
    },
    // 点击选项隐藏跳转
    examChangeBox: function () {
        if (this.data.onPracticeTurnShow) {
            this.setData({
                onPracticeTurnShow: false,
            })
        }
    },
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
    onShareAppMessage: function () {
        return {
            title: '我正在使用赛尔无人机驾考宝典',
            desc: '真的很好用',
            path: '/pages/loginin/loginin'
        }
    },
    onLoad: function (options) {
        prosData = []
        index = 0
        total_micro_second = 60 * 60 * 1000
        var that = this;
        countdown(that);
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
        getPros(parseInt(options.chooseNumOne), parseInt(options.chooseNumTwo), "true")
        this.setData({
            proSum: prosData.length
        })
        this.loadPro()
    },
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
    loadPro: function () {
        is_wait = false;
        if (index < prosData.length - 1) {
            this.setData({
                lastBut: "下一题"
            })
        } else {
            this.setData({
                lastBut: "交卷"
            })
        }
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
    finishExam: function () {
        app.globalData.examFinishData.prosData = prosData;
        app.globalData.examFinishData.examTime = 1000 * 60 * 60 - total_micro_second;
        app.globalData.examFinishData.chooseOne = __chooseOne
        app.globalData.examFinishData.chooseTwo = __chooseTwo
        wx.redirectTo({
            url: '../examresults/examresults',
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
    checkFavo: function () {
        if (favo_data.indexOf(parseInt(prosData[index].proid)) != -1) {
            return true;
        }
        return false;
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
        // 跳转题目后隐藏
        if (this.data.onPracticeTurnShow) {
            this.setData({
                onPracticeTurnShow: false,
            })

        }
    },
    toAimPro: function (pos) {
        index = pos - 1
        this.loadPro();
    },
    onA: function () {
        prosData[index].m_answer = 1//自己的答案
        this.checkAnswer()
        if (index < prosData.length - 1) {
            if (!is_wait) {
                is_wait = true;
                index++;
                setTimeout(this.loadPro, 500)
            }

        }
    },
    onB: function () {
        prosData[index].m_answer = 2//自己的答案
        this.checkAnswer()
        if (index < prosData.length - 1) {
            if (!is_wait) {
                is_wait = true;
                index++;
                setTimeout(this.loadPro, 500)
            }

        }
    },
    onC: function () {
        prosData[index].m_answer = 3//自己的答案
        this.checkAnswer()
        if (index < prosData.length - 1) {
            if (!is_wait) {
                is_wait = true;
                index++;
                setTimeout(this.loadPro, 500)
            }

        }
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
            app.sendMsg("TestFly/saveerror.action", { "proid": prosData[index].proid, "account": app.globalData.openId, "section_1": prosData[index].section_1 })
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
        } else {
            this.finishExam()
        }
        if (this.data.onPracticeTurnShow) {
            this.setData({
                onPracticeTurnShow: false,
            })

        }
    },
    onTurnBindChange: function (e) {
        const val = e.detail.value
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]]
        })
    },
    showAnswerText: function () {
        this.setData({
            show_answer_text: true,
            keySolve: prosData[index].answer_text.replace(/<br\s*\/?>/gi, "\r\n")
        })
    },
})