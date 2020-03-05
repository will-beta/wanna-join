Component({
  properties: {
    activity: Object
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