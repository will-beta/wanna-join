Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    description: null,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    deadlineDate: null,
    deadlineTime: null,
    location: null,
    maxCount: null,

    userInfo: null,
  },

  onGetUserInfo(e) {
    this.setData({
      userInfo: e.detail
    })
  },

  onChangeTitle(e) {
    this.data.title = e.detail.value
  },

  onChangeDescription(e) {
    this.data.description = e.detail.value
  },

  onChangeStartDate(e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  onChangeStartTime(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  onChangeEndDate(e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  onChangeEndTime(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  onChangeDeadlineDate(e) {
    this.setData({
      deadlineDate: e.detail.value
    })
  },

  onChangeDeadlineTime(e) {
    this.setData({
      deadlineTime: e.detail.value
    })
  },

  onChooseLocation() {
    let self = this
    wx.chooseLocation({
      success: function(res) {
        self.setData({
          location: res
        })
      },
    })
  },

  onChangeMaxCount(e) {
    this.data.maxCount = e.detail.value
  },

  onCreateActivity(e) {
    const res = wx.cloud.callFunction({
      name: 'create-a-activity',
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