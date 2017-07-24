// details.js
var active = require('../../../lib/core/active');
const tabbar_height = 50;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: undefined,
    scrollWidth: '100%',
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
    var item = active.find(options.id, active.TYPE.ACTIVITY);

    this.setData({
      item: item,
      scrollWidth: (80 * item.signup.list.length) + "px",
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
    // wx.navigateTo({
    //   url: './details-more?t=2&id=' + e.target.dataset.id
    // })

  },

  onSingup: () => {
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    let item = this.data.item;
    return {
      title: item.title,
      path: '/pages/activity/details/details?id=' + item.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})