// details-more.js
var active = require('../../../lib/core/active');
import WxParse from '../../../lib/wxParse/wxParse';

var sysinfo = undefined;
const tabbar_height = 45;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 页面配置 */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
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
    var training = active.find(options.id, active.TYPE.TRAINING);
    WxParse.wxParse('insertData', 'html', training.desc || '<div>没有详细描述</div>', that);

    that.setData({
      winWidth: sysinfo.windowWidth,
      winHeight: sysinfo.windowHeight,
      item: {
        data: training,
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

  },

  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})