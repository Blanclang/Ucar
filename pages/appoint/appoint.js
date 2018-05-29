const app = getApp();
Page({
  data: {
    tabActive:2,
    username:'',
    val:'',
    mobile:wx.getStorageSync('mobile'),
    detailInfo:{}
  },
  onLoad(options) {
    this.setData({
      val: options.val
    });
    this.setData({
      val: options.val
    })
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.baseUrl + '/api/v1/car/detail',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token'),
        vehicle_id: options.val
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res);
        if (res.data.code == 0) {
          this.setData({
            detailInfo: res.data.data
          })
          console.log(this.data.detailInfo);
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
  //姓名数据绑定
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  }, 
  // 提交定制
  appointSubmit(){
    //判断姓名输入
    if (this.data.username == "" || this.data.username.replace(/(^\s*)|(\s*$)/g, "") == "") {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
        duration: 2000
      })
      return;
    };
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.baseUrl + '/api/v1/book/order',
      method: 'POST',
      data: {
        name: this.data.username,
        vehicle_id: this.data.val,
        token: wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '../reault/reault'
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
})
