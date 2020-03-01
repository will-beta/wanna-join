Component({
  properties: {
    userInfo: {
      type: Object,
      value: null,
      observer: function(newVal, oldVal) {
        this.refreshDataFromServer()
      }
    },
    activityId: String
  },

  data: {
    activity: null,
    enrollments: null,
    me: null,
    isOverdue: null,
    isExcess: null,
    lastDateTimes: null,
    enrollmentStatus: null
  },

  observers: {
    'enrollments, me': function(enrollments, me) {
      this.setData({
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
        name: 'show-my-enrollment',
        data: {
          activityId: this.data.activityId,
          userInfo: this.data.userInfo
        },
        success: res => {
          this.setData({
            activity: res.result.activity,
            enrollments: res.result.enrollments,
            me: res.result.me,
            isOverdue: res.result.isOverdue,
            isExcess: res.result.isExcess
          })
        }
      })

      this.forceRefreshDataFromServer = false
    },

    onOpenLocation() {
      const latitude = this.data.activity.location.latitude
      const longitude = this.data.activity.location.longitude
      wx.openLocation({
        latitude,
        longitude
      })
    },

    onTapToEnroll() {
      self = this
      wx.cloud.callFunction({
        name: 'update-my-enrollment',
        data: {
          activityId: this.data.activityId,
          status: '已报名'
        },
        success: res => {
          self.refreshDataFromServer()
        }
      })
    },

    onTapToCancel() {
      self = this
      wx.cloud.callFunction({
        name: 'update-my-enrollment',
        data: {
          activityId: this.data.activityId,
          status: '已阅'
        },
        success: res => {
          self.refreshDataFromServer()
        }
      })
    }
  }
})