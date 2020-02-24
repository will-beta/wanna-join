Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    enrollment: null,
    activity: null,
    activityId: null,
    showDialog: false
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

  onTagToShowDialog() {
    this.setData({
      showDialog: true
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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
    this.setData({
      enrollment: this.data.enrollment,
      activity: this.data.activity
    })
  }
})