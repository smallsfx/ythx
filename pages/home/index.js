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

  /**
   * 页面的初始数据
   */

  data: {
    /** 页面数据 */
    types: [],
    news: [],
    hots: [],
  },

  onLoad: function (options) {
    this.setData({
      news: active.select(),
      types: active.getTypes(),
      hots: active.getHots(),
    });
  },

  onTypeTap: (e) => {
    wx.setStorageSync('FIND-TYPE', e.currentTarget.dataset.type);
    wx.switchTab({ url: '../find/index' });
  },

  /**
   * 页面下拉时触发：
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '正在加载数据...',
      icon: 'loading'
    })
  },

  /**
   * 停止页面下拉时触发：
   */
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast();
      }
    })
  }

})