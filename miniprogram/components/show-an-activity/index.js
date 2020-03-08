const dateTimeUtil = require('../../libs/date-time-util.js')

Component({
  properties: {
    activity: Object
  },

  data: {
    display: {}
  },

  observers: {
    activity: function(activity) {
      const display = {}
      const now = new Date()

      if (activity.startDate != null && activity.startTime != null && activity.dateTimeOffset != null) {
        const dateTime = dateTimeUtil.assembleDateObject(activity.startDate, activity.startTime, activity.dateTimeOffset)
        display.startDateTimeString = Object.values(dateTimeUtil.assembleDisplay(dateTime, true, now)).reduce((a, b) => a + ' ' + b)
      }
      if (activity.endDate != null && activity.endTime != null && activity.dateTimeOffset != null) {
        const dateTime = dateTimeUtil.assembleDateObject(activity.endDate, activity.endTime, activity.dateTimeOffset)
        display.endDateTimeString = Object.values(dateTimeUtil.assembleDisplay(dateTime, true, now)).reduce((a, b) => a + ' ' + b)
      }
      if (activity.deadlineDate != null && activity.deadlineTime != null && activity.dateTimeOffset != null) {
        const dateTime = dateTimeUtil.assembleDateObject(activity.deadlineDate, activity.deadlineTime, activity.dateTimeOffset)
        display.deadlineDateTimeString = Object.values(dateTimeUtil.assembleDisplay(dateTime, true, now)).reduce((a, b) => a + ' ' + b)
      }

      this.setData({
        display: display
      })
    }
  },

  methods: {
    onOpenLocation() {
      const latitude = this.data.activity.location.latitude
      const longitude = this.data.activity.location.longitude
      wx.openLocation({
        latitude,
        longitude
      })
    }
  }
})