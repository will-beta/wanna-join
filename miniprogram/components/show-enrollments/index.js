Component({
  properties: {
    enrollments: Object,
    me: String
  },

  data: {
    totalCount: null,
    lastDateTimes: null,
    enrollmentStatus: null
  },

  observers: {
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
  }
})