//index.js 
var contacts = require('../../lib/data/contacts');
var messages = require('../../lib/data/messages');
//获取应用实例  
var app = getApp()
Page({
  data: {
    winHeight: 0,
    tab: 0,
    groups: contacts.filter(''),
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
  onCharset: function (e) {
    this.setData({
      toView: e.target.dataset.charset
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  /**
 * 输入搜索文字
 */
  inputSearch: function (e) {
    this.setData({
      showsearchbutton: e.detail.cursor > 0,
      searchtext: e.detail.value,
      groups: contacts.filter(e.detail.value),
    })
  },
  /**
   * 提交搜索
   */
  submitSearch: function () {
    this.setData({
      showsearchbutton: false,
      searchtext: '',
      groups: contacts.filter(''),
    })
  },
})