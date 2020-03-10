const activityUtil = require('../../libs/activity-util.js')

Component({
  properties: {
    activity: Object
  },

  data: {
    display: null
  },

  observers: {
    activity: function (activity) {
      const now = new Date()
      const display = activityUtil.localizeDateTime(activity, now, true)
      this.setData({
        display: display
      })
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
      this.triggerEvent('onModifyActivity', this.data.activity)
    }
  }
})