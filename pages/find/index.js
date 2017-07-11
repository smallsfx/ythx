//index.js  
//获取应用实例  
var app = getApp();
var active = require('../../function/active.js');
var sysinfo = undefined;
const tabbar_height = 45;
const search_height = 59;
var list = {};
Page({
  data: {
    /** 页面配置 */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,

    showsearch: false, //显示搜索按钮
    searchtext: '', //搜索文字
    scrolltop: null, //滚动位置

    /** 数据相关 */
    list: {
      screenHeight: 0
    }
  },

  onLoad: function (options) {
    var that = this;
    sysinfo = wx.getSystemInfoSync();
    that.setData({
      winWidth: sysinfo.windowWidth,
      winHeight: sysinfo.windowHeight,
      list: {
        scrollHeight: sysinfo.windowHeight - tabbar_height
      }
    });
  },

  onShow: function (options) {

    var find_key = wx.getStorageSync('FIND-TYPE');
    if (!find_key) {
      find_key = 0;
    }

    list = {
      all_items: active.select(undefined, undefined),
      activity_items: active.select(active.TYPE.ACTIVITY, undefined),
      training_items: active.select(active.TYPE.TRAINING, undefined),
      school_items: active.select(active.TYPE.SCHOOL, undefined),
      scrollHeight: sysinfo.windowHeight - tabbar_height
    };

    this.setData({
      currentTab: find_key,
      list: list
    });
  },

  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current,
      scrolltop: 0
    });
  },

  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      that.setData({
        scrolltop: 0
      })
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        scrolltop: 0
      })
    }
  },

  inputSearch: function (e) { //输入搜索文字
    this.setData({
      showsearch: e.detail.cursor > 0,
      searchtext: e.detail.value
    })
  },
  submitSearch: function () { //提交搜索
    console.log(this.data.searchtext);
    // this.fetchServiceData();
  },
  scrollHandle: function (e) { //滚动事件
    if (e.detail.scrollTop > 200) {
      list.scrollHeight = sysinfo.windowHeight - tabbar_height
    } else {
      list.scrollHeight = sysinfo.windowHeight - tabbar_height - search_height
    }
    this.setData({
      list: list,
      scrolltop: e.detail.scrollTop
    })
  },
})