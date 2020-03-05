Component({
  properties: {
    userInfo: Object,
    activityId: String
  },

  data: {
    enrollments: null,
    me: null,

    totalCount: null,
    lastDateTimes: null,
    enrollmentStatus: null
  },

  observers: {
    'userInfo, activityId': function(userInfo, activityId) {
      this.refreshDataFromServer()
    },
    'enrollments, me': function(enrollments, me) {
      this.setData({
        totalCount: enrollments.length,
        lastDateTimes: enrollments.map(e => {
          const t = new Date(e._modifiedAt || e._createdAt)
          const month = (t.getMonth() + 1).toString().padStart(2, '0')
          const day = t.getDate().toString().padStart(2, '0')
          const hour = t.getHours().toString().padStart(2, '0')
          const minute = t.getMinutes().toString().padStart(2, '0')
          const lastDateTime = month + '-' + day + ' ' + hour + ':' + minute
          return lastDateTime
        }),
        enrollmentStatus: enrollments.find(e => e._createdBy == me).status
      })
    }
  },

  pageLifetimes: {
    /**
     * 生命周期函数--监听页面显示
     */
    show: function() {
      if (this.forceRefreshDataFromServer)
        this.refreshDataFromServer()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    hide: function() {
      this.forceRefreshDataFromServer = true
    }
  },

  methods: {
    refreshDataFromServer() {
      wx.cloud.callFunction({
        name: 'show-enrollments',
        data: {
          activityId: this.data.activityId,
          userInfo: this.data.userInfo
        },
        success: res => {
          this.setData({
            enrollments: res.result.enrollments,
            me: res.result.me
          })
        }
      })

      this.forceRefreshDataFromServer = false
    }
  }
})