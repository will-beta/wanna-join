Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    startDate: '2016-09-01',
    startTime: '12:01',
    location: null,
    publisher: null,
    maxCount: null
  },

  onGetUserInfo(e) {
    this.setData({
      "userInfo": e.detail
    })
  },

  onChangeMaxCount: function(e) {
    this.data.maxCount = e.detail.value
  },

  onChooseLocation: function() {
    let self = this
    wx.chooseLocation({
      success: function(res) {
        self.setData({
          location: res
        })
        console.log(res)
      },
    })
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