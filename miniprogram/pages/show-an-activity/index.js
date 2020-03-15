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

  updateEnrollment(e) {
    wx.cloud.callFunction({
      name: 'update-my-enrollment',
      data: e.detail,
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
        const display = activityUtil.localizeDateTime(res.result.activity, now, true)

        this.setData({
          ready: true,
          activity: res.result.activity,
          display: display,
          enrollment: res.result.enrollment,
          isExpire: res.result.isExpire,
          isFull: res.result.isFull
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