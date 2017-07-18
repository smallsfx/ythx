var active = require('../../lib/core/active');
var filterConst = require('../../lib/data/filter');
var sysinfo = undefined;
const tabbar_height = 43;
const menubar_height = 37;
const search_height = 57;
let filters = {
  ACTIVITY: {
    location: filterConst.ACTIVITY.location[0],
    type: filterConst.ACTIVITY.type[0],
    order: filterConst.ACTIVITY.order[0],
  },
  TRAINING: {
    location: filterConst.TRAINING.location[0],
    type: filterConst.TRAINING.type[0],
    order: filterConst.TRAINING.order[0],
  },
  SCHOOL: {
    location: filterConst.SCHOOL.location[0],
    type: filterConst.SCHOOL.type[0],
    order: filterConst.SCHOOL.order[0],
  }
};

var getTabIndex = (key) => {
  let tabindex = 0;
  switch (key) {
    case active.TYPE.ACTIVITY:
      tabindex = 1;
      break;
    case active.TYPE.TRAINING:
      tabindex = 2;
      break;
    case active.TYPE.SCHOOL:
      tabindex = 3;
      break;
  }
  return tabindex;
};

var getTabKey = (index) => {
  let tab = 'ALL';
  switch (index) {
    case 1:
      tab = active.TYPE.ACTIVITY;
      break;
    case 2:
      tab = active.TYPE.TRAINING;
      break;
    case 3:
      tab = active.TYPE.SCHOOL;
      break;
  }
  return tab;
};

var requestData = (key) => {
  switch (key) {
    case 1:
    case active.TYPE.ACTIVITY:
      return active.select(active.TYPE.ACTIVITY, undefined);
      break;
    case 2:
    case active.TYPE.TRAINING:
      return active.select(active.TYPE.TRAINING, undefined);
      break;
    case 3:
    case active.TYPE.SCHOOL:
      return active.select(active.TYPE.SCHOOL, undefined);
      break;
    default:
      return active.select(undefined, undefined);
      break;
  }
};

Page({

  data: {
    showsearchbar: true,
    showsearchbutton: false, //显示搜索按钮
    searchtext: '', //搜索文字
    tab: 0,
    tabHeight: 0,
    filters: filters,
    filterConst: filterConst,
    screenHeight: 0,
    scrolltop: null, //滚动位置
    menu: 0,
    menus: ['ACTIVITY', 'TRAINING', 'SCHOOL'],
    menuchildren: ['location', 'type', 'order'],
  },

  onLoad: function (options) {
    var that = this;
    sysinfo = wx.getSystemInfoSync();

    that.setData({
      tabHeight: (sysinfo.windowHeight - search_height) + "px",
      filters: filters,
      scrollHeight: sysinfo.windowHeight - tabbar_height - menubar_height
    });

    console.log('window-height:%s,search-height:%s,tab-height', sysinfo.windowHeight, search_height, this.data.tabHeight);
  },

  onShow: function (options) {
    var find_key = wx.getStorageSync('FIND-TYPE');
    if (!find_key) {
      find_key = 0;
    }

    this.setData({
      tabindex: getTabIndex(find_key),
      tab: find_key,
      items: requestData(find_key),
      scrollHeight: sysinfo.windowHeight - tabbar_height,
      tabHeight: (sysinfo.windowHeight - search_height) + "px"
    });
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    this.setData({
      items: requestData(e.detail.current),
      tabindex: e.detail.current,
      tab: getTabKey(e.detail.current),
      menu: 0,
      scrolltop: 0
    });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    if (this.data.tab === e.target.dataset.tab) {
      this.setData({
        menu: 0,
        scrolltop: 0
      });
    } else {
      this.setData({
        tabindex: getTabIndex(e.target.dataset.tab),
        tab: e.target.dataset.tab
      });
    }
  },
  /**
   * 点击menu
   */
  switchMenu: function (e) {
    if (this.data.menu === e.target.dataset.menu) {
      this.setData({
        menu: 0
      });
    } else {
      this.setData({
        menu: e.target.dataset.menu
      });
    }
  },
  /**
   * 点击menu选项
   */
  switchMenuOption: function (e) {

    let dataset = e.target.dataset;
    let value = filters[dataset.type][dataset.option];

    if (value === dataset.id) {
      let opt = filterConst[dataset.type][dataset.option];
      filters[dataset.type][dataset.option] = opt;
    } else {
      filters[dataset.type][dataset.option] = {
        "id": dataset.id,
        "text": dataset.text
      };
    }

    this.setData({
      filters: filters
    });
  },
  /**
   * 滚动事件
   */
  scrollHandle: function (e) {
    var that = this;
    let th = 0;
    if (e.detail.scrollTop > 150) {
      th = sysinfo.windowHeight - tabbar_height;
    } else {
      th = sysinfo.windowHeight - tabbar_height - search_height;
    }

    that.setData({
      menu: 0,
      showsearchbar: (e.detail.scrollTop < 150),
      tabHeight: th + "px",
      scrollHeight: (this.data.tabindex == 0 ? th : th - menubar_height)
    });
    console.log('window-height:%s,search-height:%s,tab-height', sysinfo.windowHeight, search_height, this.data.tabHeight);
  },
  /**
   * 输入搜索文字
   */
  inputSearch: function (e) {
    this.setData({
      showsearchbutton: e.detail.cursor > 0,
      searchtext: e.detail.value
    })
  },
  /**
   * 提交搜索
   */
  submitSearch: function () {
    console.log("提交搜索内容'%s'", this.data.searchtext);
    // this.fetchServiceData();
  },
})