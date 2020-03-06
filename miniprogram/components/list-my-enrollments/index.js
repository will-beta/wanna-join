Component({
  properties: {
    enrollments: Object
  },

  data: {
    enrollments: null,
    slideButtons: [{
      type: "warn",
      text: "删除"
    }]
  },

  methods: {
    onSlideButtonTap(e) {
      this.triggerEvent('onDeleteEnrollment', e.currentTarget.dataset.key)
    },
  }
})