// index.js
var appInstance = getApp();
var active = require('../../lib/core/active');

// wx.request({
//   url: 'http://localhost:3000/api/environment/',
//   method: 'GET',
//   success: function (res) {
//     console.log(res);
//   }
// })

Page({

  data: {
    items: [],
    types: active.getTypes(),
    hots: active.getHots(),
  },

  onLoad: function (options) {

  },

  onShow: function (options) {
    console.log('home/index.onShow.begin');
    this.setData({
      items: active.select(),
    });
    console.log('home/index.onShow.end');
  },

  onTypeTap: (e) => {
    wx.setStorageSync('FIND-TYPE', e.currentTarget.dataset.type);
    wx.switchTab({ url: '../find/index' });
  },

})