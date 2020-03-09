const getUserInfoEventName = 'getUserInfo'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    ready: false
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      wx.getUserInfo({
        success: res => {
          this.setData({
            ready: true
          })
          this.triggerEvent(getUserInfoEventName, res.userInfo)
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(e) {
      this.triggerEvent(getUserInfoEventName, e.detail.userInfo)
    },
  }
})