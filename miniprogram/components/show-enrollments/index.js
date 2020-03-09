const dateTimeUtil = require('../../libs/date-time-util.js')

Component({
  properties: {
    enrollments: Object
  },

  data: {
    totalCount: null,
    lastDateTimes: null,
    enrollmentStatus: null
  },

  observers: {
    enrollments: function(enrollments) {
      const now = new Date()
      this.setData({
        totalCount: enrollments.length,
        lastDateTimeStrings: enrollments.map(e => {
          const t = new Date(e._modifiedAt || e._createdAt)
          const lastDateTimeString = Object.values(dateTimeUtil.assembleDisplay(t, now, true)).reduce((a, b) => a + ' ' + b)

          return lastDateTimeString
        })
      })
    }
  }
})