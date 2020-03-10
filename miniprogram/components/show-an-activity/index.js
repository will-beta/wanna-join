const activityUtil = require('../../libs/activity-util.js')

Component({
  properties: {
    activity: Object
  },

  data: {
    display: null
  },

  observers: {
    activity: function(activity) {
      const now = new Date()
      const display = activityUtil.localizeDateTime(activity,now,true)
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