// index.js
var appInstance = getApp();
var active = require('../../../function/active.js');

Page({

  /**
   * 页面的初始数据
   */

  data: {
    /** swiper 相关属性 */

    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorDots: true,

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
    wx.setStorageSync('FIND-TYPE', e.target.dataset.type);
    wx.switchTab({
      url: '../../find/index'
    });
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