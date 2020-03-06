Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    forceRefreshDataFromServer: false,
    ready: false
  },

  refreshDataFromServer() {
    wx.cloud.callFunction({
      name: 'list-my-enrollments',
      data: {
        userInfo: this.data.userInfo
      },
      success: res => {
        this.setData({
          enrollments: res.result
        })
      }
    })

    this.forceRefreshDataFromServer = false
  },

  onDeleteEnrollment(e) {
    wx.cloud.callFunction({
      name: 'delete-my-enrollment',
      data: {
        enrollmentId: e.detail
      },
      success: () => {
        this.refreshDataFromServer()
      }
    })
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