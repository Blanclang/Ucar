//获取应用实例
const app = getApp()
Page({
  data: {
    tabActive:2,
    username:''
  },
  onLoad() {

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // }else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res;
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // } 

  },
  //获取用户信息
  getUserInfo: function (e) {
    console.log(131231);
    // console.log(e);
    wx.showLoading({
      title: '加载中',
    });
    app.globalData.userInfo = e;
    if (e.detail.errMsg == "getUserInfo:ok"){
      wx.hideLoading();
      wx.redirectTo({
        url: '../home/home'
      });
      // if (wx.getStorageSync('mobile')) {
      //   wx.redirectTo({
      //     url: '../home/home'
      //   })
      // }else{
      //   wx.redirectTo({
      //     url: '../getphone/getphone'
      //   });
      // }
    }else{
      wx.hideLoading();
    }
  },
})
