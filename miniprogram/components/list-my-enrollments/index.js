Component({
  properties: {
    userInfo: {
      type: Object,
      value: null,
      observer: function(newVal, oldVal) {
        this.refreshDataFromServer(newVal)
      }
    }
  },

  data: {
    enrollments: null,
    forceRefreshDataFromServer: false,
    slideButtons: [{
      type: "warn",
      text: "删除"
    }]
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
    refreshDataFromServer(userInfo) {
      wx.cloud.callFunction({
        name: 'list-my-enrollments',
        success: res => {
          this.setData({
            enrollments: res.result
          })
        }
      })

      this.forceRefreshDataFromServer = false
    },

    onSlideButtonTap(e) {
      self = this
      wx.cloud.callFunction({
        name: 'delete-my-enrollment',
        data: {
          _id: e.currentTarget.dataset.key
        },
        success: () => {
          self.refreshDataFromServer()
        }
      })
    },
  }
})