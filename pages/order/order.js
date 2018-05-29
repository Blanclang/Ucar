const app = getApp();
Page({
  data: {
    tabActive:2,
    // 车型数据
    carname:'',
    // 姓名数据
    username:'',
    //首付数据
    firPay:[
      {name:'1%-10%'},
      {name:'11%-20%'},
      {name:'30%及以上'}
    ],
    //首付当前选择
    firSel:'1%-10%',
    //期数数据
    weekCount: [
      {name:12},
      {name:24},
      {name:36},
      {name:48}
    ],
    //期数当前选择
    weekSel:12,
    //期数数据
    moonPay: [
      {name:'1%'},
      {name:'2%'},
      {name:'3%'},
      {name:'4%'}
    ],
    //月供当前选择
    moonPaySel:'1%',
    //电话
    mobile: wx.getStorageSync('mobile')
  },
  onLoad() {
    
  },
  //tab切换
  detailTab(event){
    //传的参数
    var val = event.currentTarget.dataset.val;
    this.setData({
      tabActive:val
    })
  },
  // 提交定制
  orderSubmit(){
    // carname
    //判断车型输入
    if (this.data.carname == "" || this.data.carname.replace(/(^\s*)|(\s*$)/g, "") == ""){
      wx.showToast({
        title:'请填写车型',
        icon: 'none',
        duration: 2000
      })
      return;
    };
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
      url: app.globalData.baseUrl + '/api/v1/custom/order',
      method: 'POST',
      data: {
        downPay:this.data.firSel,
        monthlyPay:this.data.moonPaySel,
        periods:this.data.weekSel,
        vehicle_model:this.data.carname,
        name:this.data.username,
        token:wx.getStorageSync('token')
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
  //车型名数据绑定
  carname: function(e) {
    this.setData({
      carname: e.detail.value
    })
    console.log(this.data.carname);
  },
  //姓名数据绑定
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
    // console.log(this.data.username);
  },
  // 首付选项
  firPayFun(event){
    var val = event.currentTarget.dataset.val;
    console.log(val);
    this.setData({
      firSel: val
    })
  },
  // 期数选项
  weekCountFun(event) {
    var val = event.currentTarget.dataset.val;
    console.log(val);
    this.setData({
      weekSel: val
    })
  },
  // 期数选项
  moonPayFun(event) {
    var val = event.currentTarget.dataset.val;
    console.log(val);
    this.setData({
      moonPaySel: val
    })
  }
})
