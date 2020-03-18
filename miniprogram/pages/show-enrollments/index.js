Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    activityId: null,
    forceRefreshDataFromServer: false,
    ready: false
  },

  refreshDataFromServer() {
    wx.cloud.callFunction({
      name: 'show-enrollments',
      data: {
        activityId: this.data.activityId,
        userInfo: this.data.userInfo
      },
      success: res => {
        this.setData({
          ready: true,
          enrollments: res.result.enrollments
        })
      }
    })

    this.data.forceRefreshDataFromServer = false
  },

  onGetUserInfo(e) {
    this.setData({
      userInfo: e.detail
    })
    this.refreshDataFromServer()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (getCurrentPages().length == 1) {
      wx.redirectTo({
        url: '/pages/show-an-activity/index?activityId=' + options.activityId,
      })
    }

    this.setData({
      activityId: options.activityId
    })
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
    if (this.data.forceRefreshDataFromServer)
      this.refreshDataFromServer()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.data.forceRefreshDataFromServer = true
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