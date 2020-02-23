// miniprogram/pages/show-a-activity/show-a-activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    myActivity: null,
    myActivityId: null,
    showDialog: false
  },

  onGetUserInfo(e) {
    this.setData({
      userInfo: e.detail
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
    this.data.myActivityId = options._id

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
      name: 'show-my-activity',
      data: {
        _id: this.data.myActivityId
      },
      success: res => {
        this.setData({
          myActivity: res.result
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
      myActivity: this.data.myActivity
    })
  }
})