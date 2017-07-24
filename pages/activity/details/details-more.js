// details-more.js
var active = require('../../../lib/core/active');

import WxParse from '../../../lib/wxParse/wxParse';

let sysinfo = undefined;
let evaluate = undefined;
let activity = undefined;
const tabbar_height = 45;

var refresh_evaluate = (that) => {
  evaluate = activity.evaluate;
  delete activity['evaluate'];
  that.setData({
    item: {
      data: activity,
      scrollHeight: sysinfo.windowHeight - tabbar_height
    },
  });
  setTimeout(function () {
    activity.evaluate = evaluate;
    that.setData({
      item: {
        data: activity,
        scrollHeight: sysinfo.windowHeight - tabbar_height
      },
    });
  }, 1000);
};


var refreshTab = (that, index) => {
  switch (index) {
    case '0':
      break;
    case '1':
      refresh_evaluate(that);
      break;
    case '2':
      break;
  }
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    currentTab: 0,

    /** 数据相关 */
    item: {
      data: undefined,
      screenHeight: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    sysinfo = wx.getSystemInfoSync();
    if (!options.id) {
      options.id = 1;
    }
    if (!options.t) {
      options.t = 1;
    }
    activity = active.find(options.id, active.TYPE.ACTIVITY);

    WxParse.wxParse('insertData', 'html', activity.desc, that);

    that.setData({
      winHeight: sysinfo.windowHeight,
      item: {
        data: activity,
        scrollHeight: sysinfo.windowHeight - tabbar_height
      },
      currentTab: options.t
    });

  },

  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    refreshTab(e.detail.current);
  },

  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;

    if (this.data.currentTab == e.target.dataset.current) {

    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
    }
    refreshTab(that, e.target.dataset.current);
  }
})