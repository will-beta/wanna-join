Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    activity: null,
    enrollments: null,
    me: null,
    isOverdue: null,
    isExcess: null,
    enrollmentStatus: null
  },

  refreshDataFromServer() {
    wx.cloud.callFunction({
      name: 'show-my-enrollment',
      data: {
        activityId: this.data.activityId,
        userInfo: this.data.userInfo
      },
      success: res => {
        this.setData({
          activity: res.result.activity,
          enrollments: res.result.enrollments.map(e => {
            const t = new Date(e._modifiedAt || e._createdAt)
            e.lastDateTime = (t.getMonth() + 1).toString().padStart(2, '0') + '-' + t.getDate().toString().padStart(2, '0') + ' ' + t.getHours().toString().padStart(2, '0') + ':' + t.getMinutes().toString().padStart(2, '0')
            return e
          }),
          me: res.result.me,
          isOverdue: res.result.isOverdue,
          isExcess: res.result.isExcess,
          enrollmentStatus: res.result.enrollments.find(e => e._createdBy == res.result.me).status
        })
      }
    })

    this.forceRefreshDataFromServer = false
  },

  onGetUserInfo(e) {
    this.setData({
      userInfo: e.detail
    })
    this.refreshDataFromServer()
  },

  onOpenLocation() {
    const latitude = this.data.activity.location.latitude
    const longitude = this.data.activity.location.longitude
    wx.openLocation({
      latitude,
      longitude
    })
  },

  onTapToEnroll() {
    self = this
    wx.cloud.callFunction({
      name: 'update-my-enrollment',
      data: {
        activityId: this.data.activity._id,
        status: '已报名'
      },
      success: res => {
        self.refreshDataFromServer()
      }
    })
  },

  onTapToCancel() {
    self = this
    wx.cloud.callFunction({
      name: 'update-my-enrollment',
      data: {
        activityId: this.data.activity._id,
        status: '已阅'
      },
      success: res => {
        self.refreshDataFromServer()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.activityId = options.activityId
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.refreshDataFromServer()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})