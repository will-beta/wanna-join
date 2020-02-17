// miniprogram/pages/list-my-activities/list-my-activities.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    slideButtons: [{
      type: "warn",
      text: "删除"
    }],
    myActivities: [{
      coverImage: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
      publisher: "大贝塔",
      startTime: "2020-1-0",
      location: {
        name: "海南",
        address: null
      },
      status: "已报名"
    }, {
      coverImage: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
      publisher: "大贝塔",
      startTime: "2020-1-1",
      location: {
        name: "浙江",
        address: null
      },
      status: "已报名"
    }, {
      coverImage: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
      publisher: "大贝塔",
      startTime: "2020-1-2",
      location: {
        name: "上海",
        address: null
      },
      status: "已报名"
    }, {
      coverImage: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
      publisher: "大贝塔",
      startTime: "2020-1-3",
      location: {
        name: "北京",
        address: null
      },
      status: "已报名"
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