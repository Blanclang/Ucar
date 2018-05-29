const app = getApp();
Page({
  data: {
    cardInfo:{},
  },
  onLoad() {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.baseUrl + '/api/v1/wx/card',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if (res.data.code == 0) {
          this.setData({
            cardInfo: res.data.data
          })
        } else if (res.data.code == -1) {
          wx.redirectTo({
            url: '../home/home'
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: app.globalData.failTit,
          icon: 'none',
          duration: 2000
        })
      },
      complete: res => {
        wx.hideLoading();
      }
    });
  },
  //积分提示
  quantity(){
    wx.showModal({
      title: '提示',
      content: '您还没有足够积分享受该服务',
      showCancel: false,
      confirmText: '知道了',
      success: function (res) { }
    });
  }
})
