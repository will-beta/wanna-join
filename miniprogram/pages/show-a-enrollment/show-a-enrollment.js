Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    activityId: null,
    enrollment: null,
    activity: null
  },

  refreshDataFromServer() {
    wx.cloud.callFunction({
      name: 'show-my-enrollment',
      data: {
        activityId: this.data.activityId
      },
      success: res => {
        this.setData({
          enrollment: res.result.enrollment,
          activity: res.result.activity
        })
      }
    })

    this.forceRefreshDataFromServer = false
  },

  onGetUserInfo(e) {
    this.setData({
      userInfo: e.detail
    })
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
        _id: this.data.enrollment._id,
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
        _id: this.data.enrollment._id,
        status: '已取消'
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

    wx.getUserInfo({
      success: res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    })

    this.refreshDataFromServer()
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