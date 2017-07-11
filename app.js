const openIdUrl = require('./config').openIdUrl
// App函数是一个全局函数，用于创建应用程序对象
App({
  // ========== 全局数据对象（可以整个应用程序共享） ==========
  globalData: {
    hasLogin: false,
    openid: null,
    userInfo: null
  },
  globalPage: 1,
  globalName: 'ios',
  globalType: 'common',
  // ========== 应用程序全局方法 ==========
  // lazy loading openid
  getUserOpenId: function (callback) {
    var self = this
    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  // ========== 生命周期方法 ==========
  // 应用程序启动时触发一次
  onLaunch: function () {
    console.log('App Launch')
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  // 当应用程序进入前台显示状态时触发
  onShow: function () {
    console.log('App Show')
  },
  // 当应用程序进入后台状态时触发
  onHide: function () {
    console.log('App Hide')
  }
})