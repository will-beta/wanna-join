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
    onShow: function() {
      if (this.forceRefreshDataFromServer)
        this.refreshDataFromServer()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
      this.forceRefreshDataFromServer = true
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
      this.refreshDataFromServer()
    },
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