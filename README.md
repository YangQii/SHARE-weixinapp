# SHARE-weixinapp
SHARE-weixinapp
无人机驾考微信小程序

wx.login , wx.getUserInfo 实现小程序登录。

wx.getStorageSync， wx.setStorageSync 同步获取题库储存在本地缓存以及调用缓存

采用unionid 为唯一通用标识，实现和安卓端错题和收藏的动态更新

每次登录向服务器发送特定字段，判断题库缓存是否需要更新

模拟考试随机取出100题，通过setTimeOut倒计时
使用json.parse和json.stringify 解析json对象，json字符串

分别创建新数组保存错题id和收藏id，并发送给服务端

整个小程序利用微信小程序官方框架和原生JavaScript
