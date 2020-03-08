const activityUtil = require('../../libs/activity-util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    activityId: null,
    activity: null,
    enrollment: null,
    isExpire: null,
    isFull: null,
    forceRefreshDataFromServer: false,
    ready: false
  },

  updateEnrollmentStatus(status) {
    wx.cloud.callFunction({
      name: 'update-my-enrollment',
      data: {
        activityId: this.data.activityId,
        status: status
      },
      success: res => {
        this.refreshDataFromServer()
      }
    })
  },

  refreshDataFromServer() {
    wx.cloud.callFunction({
      name: 'show-an-activity',
      data: {
        activityId: this.data.activityId,
        userInfo: this.data.userInfo
      },
      success: res => {
        const now = new Date()
        const activity = activityUtil.localizeDateTime(res.result.activity, now)
        activity.dateTimeOffset = now.dateTimeOffset

        this.setData({
          ready: true,
          activity: res.result.activity,
          enrollment: res.result.enrollment,
          isExpire: res.result.isExpire,
          isFull: res.result.isFull
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

  onTapToNavigate(e) {
    wx.navigateTo({
      url: e.target.dataset.url
    })
  },

  onTapToEnroll(e) {
    const status = '已报名'
    this.updateEnrollmentStatus(status)
  },

  onTapToCancelEnroll(e) {
    const status = '已取消报名'
    this.updateEnrollmentStatus(status)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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