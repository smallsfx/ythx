//index.js 
var contacts = require('../../lib/data/contacts');
var messages = require('../../lib/data/messages');
//获取应用实例  
var app = getApp()
Page({
  data: {
    winHeight: 0,
    tab: 0,
    contacts: contacts,
    messages: messages,
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    var that = this;
    that.setData({
      tab: e.detail.current
    });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    if (this.data.tab === e.target.dataset.tab) {
      return false;
    } else {
      this.setData({
        tab: e.target.dataset.tab
      })
    }
  },

})