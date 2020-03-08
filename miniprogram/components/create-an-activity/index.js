Component({
  data: {
    activity: {
      dateTimeOffset: new Date().getTimezoneOffset() 
    }
  },

  methods: {
    onChangeTitle(e) {
      this.data.activity.title = e.detail.value
    },

    onChangeDescription(e) {
      this.data.activity.description = e.detail.value
    },

    onChangeStartDate(e) {
      if (!this.data.activity.startTime) {
        this.data.activity.startTime = '00:00'
      }
      this.data.activity.startDate = e.detail.value
      this.setData({
        activity: this.data.activity
      })
    },

    onChangeStartTime(e) {
      if (!this.data.activity.startDate) {
        const date = new Date()
        this.data.activity.startDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
      }
      this.data.activity.startTime = e.detail.value
      this.setData({
        activity: this.data.activity
      })
    },

    onChangeEndDate(e) {
      if (!this.data.activity.endTime) {
        this.data.activity.endTime = '00:00'
      }
      this.data.activity.endDate = e.detail.value
      this.setData({
        activity: this.data.activity
      })
    },

    onChangeEndTime(e) {
      if (!this.data.activity.endDate) {
        const date = new Date()
        this.data.activity.endDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
      }
      this.data.activity.endTime = e.detail.value
      this.setData({
        activity: this.data.activity
      })
    },

    onChangeDeadlineDate(e) {
      if (!this.data.activity.deadlineTime) {
        this.data.activity.deadlineTime = '00:00'
      }
      this.data.activity.deadlineDate = e.detail.value
      this.setData({
        activity: this.data.activity
      })
    },

    onChangeDeadlineTime(e) {
      if (!this.data.activity.deadlineDate) {
        const date = new Date()
        this.data.activity.deadlineDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
      }
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

    onCreateActivity(e) {
      this.triggerEvent('onCreateActivity', this.data.activity)
    }
  }
})