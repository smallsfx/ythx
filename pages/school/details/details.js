// details.js
var active = require('../../../lib/core/active');
const tabbar_height = 50;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    item: undefined,
    scrollHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sysinfo = wx.getSystemInfoSync();
    if (!options.id) {
      options.id = 1;
    }
    var item = active.find(options.id, active.TYPE.SCHOOL);

    this.setData({
      text: JSON.stringify(item),
      item: item,
      scrollHeight: sysinfo.windowHeight - tabbar_height
    });
  },

  onCall: () => {
    wx.makePhoneCall({
      phoneNumber: '13700043840',
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },

  onTalk: (e) => {
    wx.navigateTo({
      url: './details-more?t=2&id=' + e.target.dataset.id
    })
  },

  onSingup: () => {

  }
})