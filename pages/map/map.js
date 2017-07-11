Page({
  data: {
    windowHeight: '100%',
    markers: []
  },

  onLoad: function (options) {
    var that = this;
    var sysinfo = wx.getSystemInfoSync();

    this.setData({
      windowHeight: (sysinfo.windowHeight) + "px"
    });

    if (options.lng && options.lat && options.name) {
      this.setData({
        longitude: options.lng,
        latitude: options.lat,
        markers: [{
          id: 1,
          latitude: options.lng,
          longitude: options.lng,
          title: options.name,
          iconPath: '/assets/head-icon/avatar1.jpg'
        }]
      });
    }

  }

})