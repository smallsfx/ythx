// index.js
var sysinfo = undefined;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    tab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    sysinfo = wx.getSystemInfoSync();
    this.setData({
      winHeight: sysinfo.windowHeight
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