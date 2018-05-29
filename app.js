//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // console.log(res);
    //     // wx.setStorage({
    //     //   key: "code",
    //     //   data: res.code
    //     // })
    //     // 同步保存code
    //     wx.setStorageSync('code', res.code);
    //     console.log('登陆'+wx.getStorageSync('code'));
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log(22);
    //     console.log(res);
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       console.log('已经授权');
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(333);
    //           console.log(res);
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //           // wx.navigateTo({ redirectTo
    //           //   url: '/pages/home/home'
    //           // })
    //         }
    //       })
    //     }else{
    //       console.log('未授权1');
    //       wx.redirectTo({
    //         url: '/pages/login/login'
    //       })
    //     }
    //   }
    // });
  },
  globalData: {
    userInfo: {},
    failTit: '网络fail',
    baseUrl:'https://wxapp.dongzhengafc.com/uauto'
    // baseUrl:'http://192.168.1.235:8081/uauto'
    // baseUrl: 'http://192.168.1.233:9080/uauto'
  }
})