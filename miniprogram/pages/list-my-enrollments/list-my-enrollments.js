Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    enrollments: null,
    forceRefreshDataFromServer: false,
    slideButtons: [{
      type: "warn",
      text: "删除"
    }]
  },

  observers: {
    'numberA, numberB': function(numberA, numberB) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      this.setData({
        sum: numberA + numberB
      })
    }
  },

  refreshDataFromServer() {
    wx.cloud.callFunction({
      name: 'list-my-enrollments',
      success: res => {
        this.setData({
          enrollments: res.result
        })
      }
    })

    this.forceRefreshDataFromServer = false
  },

  onGetUserInfo(e) {
    this.setData({
      "userInfo": e.detail
    })
    this.refreshDataFromServer()
  },

  onSlideButtonTap(e) {
    self = this
    wx.cloud.callFunction({
      name: 'delete-my-enrollment',
      data: {
        _id: e.currentTarget.dataset.key
      },
      success: () => {
        self.refreshDataFromServer()
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
        this.refreshDataFromServer()
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