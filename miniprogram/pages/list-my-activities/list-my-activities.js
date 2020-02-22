// miniprogram/pages/list-my-activities/list-my-activities.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    myActivities: null,
    forceRefreshMyActivities: false,
    slideButtons: [{
      type: "warn",
      text: "删除"
    }]
  },

  onGetUserInfo(e) {
    this.setData({
      "userInfo": e.detail
    })
  },

  slideButtonTap(e) {
    this.data.myActivities.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      myActivities: this.data.myActivities
    })
  },

  refreshMyActivities() {
    wx.cloud.callFunction({
      name: 'list-my-activities',
      success: res => {
        this.setData({
          myActivities: res.result
        })
      }
    })

    this.refreshMyActivities = false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getUserInfo({
      success: res => {
        this.setData({
          userInfo: res.userInfo,
          publisher: res.userInfo.nickName
        })
      }
    })

    this.refreshMyActivities()
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
    if (this.refreshMyActivities)
      this.refreshMyActivities()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.refreshMyActivities = true
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
    this.refreshMyActivities()
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