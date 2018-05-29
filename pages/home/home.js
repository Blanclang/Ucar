//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // banner图片
    imgUrls: [
      './../../images/banner1.jpg',
      './../../images/banner2.jpg',
      './../../images/banner3.jpg',
      './../../images/banner4.jpg'
    ],
    //导航数据
    navData:[
      {
        val:'BMA,ADA,JBA,HQA,LHB',
        icon: './../../images/tabicon1.png',
        name:'全部'
      },
      {
        val: 'BMA',
        icon: './../../images/tabicon2.png',
        name: '宝马'
      },
      {
        val: 'ADA',
        icon: './../../images/tabicon3.png',
        name: '奥迪'
      },
      {
        val: 'JBA',
        icon: './../../images/tabicon4.png',
        name: '捷豹'
      },
      {
        val: 'HQA',
        icon: './../../images/tabicon5.png',
        name: '红旗'
      },
      {
        val: 'LHB',
        icon: './../../images/tabicon6.png',
        name: '路虎'
      }
    ],
    //当前导航
    currentTab:'BMA,ADA,JBA,LHB',
    // 车辆数据
    carData:[
      // {
      //   vehicleId:"11",
      //   downPay:"2",
      //   monthlyPay:"2000",
      //   coverImg:"./../../images/car.png",
      //   familyName:"2017款 1.6L 自动豪华型",
      //   commonName:"宝马528Li",
      // }
    ]
  },
  onLoad: function () {
    // 授权
    this.getAuthory();
    // this.getCarData();
  },
  //判断授权
  getAuthory(){
    wx.showLoading({
      title: '加载中',
    });
    console.log('授权');
    wx.getSetting({
      success: res => {
        var setres = res;
        // 登陆
        wx.showLoading({
          title: '加载中',
        });
        console.log('setting');
        wx.login({
          success: res => {
            // 同步保存code
            console.log('登陆');
            wx.setStorageSync('code', res.code);
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (setres.authSetting['scope.userInfo']) {
              console.log('已经授权');
              // 已授权获取用户信息
              this.getInfo();
            } else {
              console.log('未授权1');
              wx.showToast({
                title: '请先授权小程序',
                icon: 'none',
                duration: 2000
              });
              setTimeout(()=>{
                wx.redirectTo({
                  url: '/pages/login/login'
                });
              },1500);
              
            }
          },
          fail: res => {
            console.log(res);
            wx.showToast({
              title: 'login:fail',
              // title: app.globalData.failTit,
              icon: 'none',
              duration: 2000
            });
          },
          complete: res => {
            wx.hideLoading();
          }
        })      
      },
      fail: res => {
        console.log(res);
        wx.showToast({
          title: 'getSetting:fail',
          // title: app.globalData.failTit,
          icon: 'none',
          duration: 2000
        })
      },
      complete: res => {
        wx.hideLoading();
      }
    })
  },
  //已授权获取用户信息
  getInfo(){
    wx.showLoading({
      title: '加载中',
    });
    wx.getUserInfo({
      success: res => {
        console.log(res);
        // 用户信息保存
        app.globalData.userInfo = res;
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
        
        var info = app.globalData.userInfo;
        
        //获取token
        wx.showLoading({
          title: '加载中',
        });
        wx.request({
          url: app.globalData.baseUrl + '/api/v1/wx/getToken',
          method: 'POST',
          data: {
            code: wx.getStorageSync('code'),  // 小程序code
            encryptedData: info.encryptedData,// 小程序加密数据
            iv: info.iv, //向量
            nickName: info.userInfo.nickName//微信用户昵称
          },
          header: { 'content-type': 'application/json' },
          success: res => {
            console.log(res);
            if (res.data.code == 0) {
              // 保存token
              wx.setStorageSync('token', res.data.data.token);
              wx.setStorageSync('mobile', res.data.data.mobile);
              console.log('获取成功');
              //判断是否绑定手机号
              if (res.data.data.mobile) {
                //获取数据
                this.getCarData();
              } else {
                wx.redirectTo({
                  url: '../getphone/getphone'
                });
              }
            } else if (res.data.code == -1) {
              console.log('获取token过期');
              wx.showToast({
                title: 'token过期',
                icon: 'none',
                duration: 2000
              });
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
            console.log(res);
            wx.showToast({
              title:'接口返回fail',
              // title: app.globalData.failTit,
              icon: 'none',
              duration: 2000
            })
          },
          complete: res => {
            wx.hideLoading();
          }
        });
        
      },
      fail: res => {
        console.log(res);
        wx.showToast({
          title: 'getUserInfo:fail',
          // title: app.globalData.failTit,
          icon: 'none',
          duration: 2000
        })
      },
      complete: res => {
        wx.hideLoading();
      }
    });
  },
  //获取车辆数据
  getCarData(){
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.baseUrl + '/api/v1/car/index',
      method:'POST',
      data: {
        brands: this.data.currentTab,
        token: wx.getStorageSync('token')
      },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.log(res)
        if (res.data.code == 0) {
          this.setData({
            carData: res.data.data
          });
        } else if (res.data.code == -1) {
          console.log('token过期');
          wx.showToast({
            title: 'token过期',
            icon: 'none',
            duration: 2000
          });
          wx.redirectTo({
            url: '../home/home'
          });
        } else {
          console.log(111);
          wx.showToast({
            title: '地址fail',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: res => {
        wx.showToast({
          title: '网络fail',
          // title: app.globalData.failTit,
          icon: 'none',
          duration: 2000
        });
        console.log(res);
      },
      complete: res => {
        wx.hideLoading();
      }
    });
  },
  //导航选择
  navSel(event){
    var val = event.currentTarget.dataset.val;
    console.log(val);
    this.setData({
      currentTab: val
    });
    this.getCarData();
  },
  //打电话
  makePhone(){
    wx.makePhoneCall({
      phoneNumber: '4001801234'
    })
  }
})
