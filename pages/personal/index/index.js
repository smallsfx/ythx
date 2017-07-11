"use strict";
var app = getApp();

Page({
  data: {
    userInfo: {},
    y_menus: [{
        title: '消息通知'
      },
      {
        title: '浏览历史'
      },
      {
        title: '吐槽一下'
      },
    ],
  },
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (userInfo) {
      console.log(userInfo);

      //设置用户信息
      that.setData({
        userInfo: userInfo
      })
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  onSetting: function () {
    wx.openSetting({
      success: (res) => {
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
      }
    });
    // 获取微信运动数据
    wx.getWeRunData({
      success(res) {
        const encryptedData = res.encryptedData
      }
    });
    // 读取小程序权限
    // wx.getSetting({
    //   success: (res) => {
    //     /*
    //      * res.authSetting = {
    //      *   "scope.userInfo": true,
    //      *   "scope.userLocation": true
    //      * }
    //      */
    //   }
    // })
    //获取收货地址
    // wx.chooseAddress({
    //   success: function (res) {
    //     console.log(res.userName)
    //     console.log(res.postalCode)
    //     console.log(res.provinceName)
    //     console.log(res.cityName)
    //     console.log(res.countyName)
    //     console.log(res.detailInfo)
    //     console.log(res.nationalCode)
    //     console.log(res.telNumber)
    //   }
    // });
  }
})