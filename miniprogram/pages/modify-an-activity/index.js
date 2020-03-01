Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    activity: {},
    activityId: null
  },

  refreshDataFromServer() {
    wx.cloud.callFunction({
      name: 'show-an-activity',
      data: {
        _id: this.data.activityId
      },
      success: res => {
        this.setData({
          activity: res.result
        })
      }
    })
  },

  onGetUserInfo(e) {
    this.setData({
      userInfo: e.detail
    })
    this.refreshDataFromServer()
  },

  onChangeTitle(e) {
    this.data.activity.title = e.detail.value
  },

  onChangeDescription(e) {
    this.data.activity.description = e.detail.value
  },

  onChangeStartDate(e) {
    this.data.activity.startDate = e.detail.value
    this.setData({
      activity: this.data.activity
    })
  },

  onChangeStartTime(e) {
    this.data.activity.startTime = e.detail.value
    this.setData({
      activity: this.data.activity
    })
  },

  onChangeEndDate(e) {
    this.data.activity.endDate = e.detail.value
    this.setData({
      activity: this.data.activity
    })
  },

  onChangeEndTime(e) {
    this.data.activity.endTime = e.detail.value
    this.setData({
      activity: this.data.activity
    })
  },

  onChangeDeadlineDate(e) {
    this.data.activity.deadlineDate = e.detail.value
    this.setData({
      activity: this.data.activity
    })
  },

  onChangeDeadlineTime(e) {
    this.data.activity.deadlineTime = e.detail.value
    this.setData({
      activity: this.data.activity
    })
  },

  onChooseLocation() {
    wx.chooseLocation({
      success: res => {
        this.data.activity.location = res
        this.setData({
          activity: this.data.activity
        })
      },
    })
  },

  onChangeMinEnrollmentCount(e) {
    this.data.activity.minEnrollmentCount = e.detail.value
  },

  onChangeMaxEnrollmentCount(e) {
    this.data.activity.maxEnrollmentCount = e.detail.value
  },

  onModifyActivity(e) {
    const res = wx.cloud.callFunction({
      name: 'modify-an-activity',
      data: this.data,
      success: res => {
        switch (res.errMsg) {
          case "cloud.callFunction:ok":
            wx.navigateBack({});
            break;
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.activityId = options._id
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

  }
})