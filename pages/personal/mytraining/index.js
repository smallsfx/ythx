var active = require('../../../lib/core/active');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: active.select(active.TYPE.TRAINING, undefined)
  },

  /**TRAINING
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})