//获取应用实例
const app = getApp()
Page({
  data: {
  },
  onLoad() {
    wx.login({
      success: res => {
        // 同步保存code
        wx.setStorageSync('code', res.code);
      }
    })  
  },
  //手机授权
  getPhoneNumber: function (e) {
    console.log(e)
    wx.showLoading({
      title: '加载中',
    });
    var info = app.globalData.userInfo;
    console.log(999999999);
    console.log(info);
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      console.log(11221122);
      var aa = info.userInfo ? info.userInfo.nickName : info.detail.userInfo.nickName;
      console.log(aa);
      wx.request({
        url: app.globalData.baseUrl + '/api/v1/wx/register',
        method: 'POST',
        data: {
          code: wx.getStorageSync('code'),  // 小程序code
          encryptedData: e.detail.encryptedData,// 小程序加密数据
          iv: e.detail.iv, //向量
          nickName: info.userInfo?info.userInfo.nickName:info.detail.userInfo.nickName//微信用户昵称
        },
        header: { 'content-type': 'application/json' },
        success: res => {
          console.log(res);
          console.log(2223322);
          if (res.data.code == 0) {
            // 保存手机号
            wx.setStorageSync('mobile', res.data.data.mobile);
            //获取首次注册积分
            wx.showModal({
              title: '提示',
              content: '恭喜您获取100积分',
              showCancel: false,
              confirmText: '知道了',
              success: function (res) {
                wx.redirectTo({
                  url: '../home/home'
                });
              }
            });
          } else if (res.data.code == -1){
            wx.showToast({
              title: 'token错误',
              icon: 'none',
              duration: 2000
            });
            wx.redirectTo({
              url: '../home/home'
            });
          }else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: res => {
          console.log(res);
          wx.showToast({
            title: 'getPhoneNumber:fail',
            icon: 'none',
            duration: 2000
          })
        },
        complete: res => {
          wx.hideLoading();
        }
      });
    }else{
      wx.hideLoading();
      wx.showToast({
        title:'未同意绑定手机',
        icon: 'none',
        duration: 2000
      })
    }

  }
})
