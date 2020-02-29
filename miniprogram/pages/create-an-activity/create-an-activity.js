Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    activity: {}
  },

  onGetUserInfo(e) {
    this.setData({
      userInfo: e.detail
    })
  },

  onChangeTitle(e) {
    this.data.activity.title = e.detail.value
  },

  onChangeDescription(e) {
    this.data.activity.description = e.detail.value
  },

  onChangeStartDate(e) {
    if (!this.data.activity.startTime) {
      this.data.activity.startTime = '00:00'
    }
    this.data.activity.startDate = e.detail.value
    this.setData({
      activity: this.data.activity
    })
  },

  onChangeStartTime(e) {
    if (!this.data.activity.startDate) {
      const date = new Date()
      this.data.activity.startDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    }
    this.data.activity.startTime = e.detail.value
    this.setData({
      activity: this.data.activity
    })
  },

  onChangeEndDate(e) {
    if (!this.data.activity.endTime) {
      this.data.activity.endTime = '00:00'
    }
    this.data.activity.endDate = e.detail.value
    this.setData({
      activity: this.data.activity
    })
  },

  onChangeEndTime(e) {
    if (!this.data.activity.endDate) {
      const date = new Date()
      this.data.activity.endDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    }
    this.data.activity.endTime = e.detail.value
    this.setData({
      activity: this.data.activity
    })
  },

  onChangeDeadlineDate(e) {
    if (!this.data.activity.deadlineTime) {
      this.data.activity.deadlineTime = '00:00'
    }
    this.data.activity.deadlineDate = e.detail.value
    this.setData({
      activity: this.data.activity
    })
  },

  onChangeDeadlineTime(e) {
    if (!this.data.activity.deadlineDate) {
      const date = new Date()
      this.data.activity.deadlineDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    }
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

  onChangeMaxEnrollmentCount(e) {
    this.data.activity.maxEnrollmentCount = e.detail.value
  },

  onCreateActivity(e) {
    const res = wx.cloud.callFunction({
      name: 'create-an-activity',
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