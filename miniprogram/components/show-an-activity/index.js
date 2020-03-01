Component({
  properties: {
    userInfo: Object,
    activityId: String
  },

  data: {
    activity: null,
    me: null
  },

  observers: {
    'userInfo, activityId': function(userInfo, activityId) {
      this.refreshDataFromServer()
    }
  },

  pageLifetimes: {
    /**
     * 生命周期函数--监听页面显示
     */
    show: function() {
      if (this.forceRefreshDataFromServer)
        this.refreshDataFromServer()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    hide: function() {
      this.forceRefreshDataFromServer = true
    }
  },

  methods: {
    refreshDataFromServer() {
      wx.cloud.callFunction({
        name: 'show-an-activity',
        data: {
          activityId: this.data.activityId,
          userInfo: this.data.userInfo
        },
        success: res => {
          this.setData({
            activity: res.result.activity,
            me: res.result.me
          })
        }
      })

      this.forceRefreshDataFromServer = false
    },

    onOpenLocation() {
      const latitude = this.data.activity.location.latitude
      const longitude = this.data.activity.location.longitude
      wx.openLocation({
        latitude,
        longitude
      })
    }
  }
})