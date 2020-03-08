const dateTimeUtil = require('../../libs/date-time-util.js')

Component({
  properties: {
    enrollments: Object
  },

  data: {
    enrollments: null,
    slideButtons: [{
      type: "warn",
      text: "删除"
    }],
    displays: []
  },

  observers: {
    enrollments: function(enrollments) {
      if (enrollments) {
        const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
        const now = new Date()
        for (const d of enrollments) {
          const display = {}
          this.data.displays.push(display)

          if (d.activity.startDate && d.activity.startTime) {
            const startDateTime = dateTimeUtil.assembleDateObject(d.activity.startDate, d.activity.startTime, d.activity.dateTimeOffset)
            display.startDateTimeString = Object.values(dateTimeUtil.assembleDisplay(startDateTime, true, now)).reduce((a, b) => a + ' ' + b)

            const weekday = weekdays[startDateTime.getDay()]
            display.weekday = weekday

            if (d.activity.endDate && d.activity.endTime) {
              const endDateTime = dateTimeUtil.assembleDateObject(d.activity.endDate, d.activity.endTime, d.activity.dateTimeOffset)
              const timespan = endDateTime - startDateTime
              display.timespanString = dateTimeUtil.assembleTimeSpanString(timespan)
            }
          }
        }
        this.setData({
          displays: this.data.displays
        })
      }
    }
  },

  methods: {
    onSlideButtonTap(e) {
      this.triggerEvent('onDeleteEnrollment', e.currentTarget.dataset.key)
    },
  }
})