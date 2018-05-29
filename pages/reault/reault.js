Page({
  data: {
  },
  onLoad() {
    
  },
  toHome(){
    wx.reLaunch({
      url: '../home/home'
    });
  }
})
