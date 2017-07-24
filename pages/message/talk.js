var contacts = require('../../lib/data/attr-contacts');
var messages = require('../../lib/data/attr-messages');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var options = options || {};
    var index = options.index || 1;

    this.setData({
      message: messages[index]
    });
  },

  onPreview: function (e) {
    var urls = [];
    this.data.message.contents.forEach(function (content, index) {
      if (content.img) {
        urls.push(content.img);
      }
    });

    wx.previewImage({
      current: e.target.dataset.src,
      urls: urls,
      //这根本就不走
      success: function (res) {
        console.log(res);
      },
      //也根本不走
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.log('complete')
      }
    });
  }
})