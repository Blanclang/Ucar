
const app = getApp();
Page({
  data: {
    tabActive:1,
    detailInfo:{},
    //车辆参数
    carInfo:{},
    val:""
  },
  onLoad(options) {
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
        vehicle_id:options.val
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res);
        if (res.data.code == 0) {
          //处理null
          var conf = res.data.data.conf;
          for (var item in conf){
            var info = conf[item];
            for (var itm in info){
              if (!info[itm]){
                info[itm] = '-';
              }
            }
          }
          this.setData({
            detailInfo: res.data.data,
            carInfo: conf
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
      complete:res=>{
        wx.hideLoading();
      }
    });
  },
  //tab切换
  detailTab(event){
    //传的参数
    var val = event.currentTarget.dataset.val;
    this.setData({
      tabActive:val
    })
  }
})
