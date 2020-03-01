Component({
  properties: {
    userInfo: {
      type: Object,
      observer: function(newVal, oldVal) {
        this.refreshDataFromServer()
      }
    },
    activityId: String
  },

  data: {
    userInfo: null,
    activity: {}
  },

  methods: {
    refreshDataFromServer() {
      wx.cloud.callFunction({
        name: 'show-an-activity',
        data: {
          activityId: this.data.activityId,
          userInfo: this.data.userInfo
        },
        success: res => {
          this.setData({
            activity: res.result.activity
          })
        }
      })
    },

    onChangeTitle(e) {
      this.data.activity.title = e.detail.value
    },

    onChangeDescription(e) {
      this.data.activity.description = e.detail.value
    },

    onChangeStartDate(e) {
      this.data.activity.startDate = e.detail.value
      this.setData({
        activity: this.data.activity
      })
    },

    onChangeStartTime(e) {
      this.data.activity.startTime = e.detail.value
      this.setData({
        activity: this.data.activity
      })
    },

    onChangeEndDate(e) {
      this.data.activity.endDate = e.detail.value
      this.setData({
        activity: this.data.activity
      })
    },

    onChangeEndTime(e) {
      this.data.activity.endTime = e.detail.value
      this.setData({
        activity: this.data.activity
      })
    },

    onChangeDeadlineDate(e) {
      this.data.activity.deadlineDate = e.detail.value
      this.setData({
        activity: this.data.activity
      })
    },

    onChangeDeadlineTime(e) {
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

    onChangeMinEnrollmentCount(e) {
      this.data.activity.minEnrollmentCount = e.detail.value
    },

    onChangeMaxEnrollmentCount(e) {
      this.data.activity.maxEnrollmentCount = e.detail.value
    },

    onModifyActivity(e) {
      const res = wx.cloud.callFunction({
        name: 'modify-an-activity',
        data: this.data,
        success: res => {
          switch (res.errMsg) {
            case "cloud.callFunction:ok":
              wx.navigateBack({});
              break;
          }
        }
      })
    }
  }

})