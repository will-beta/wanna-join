const eventName = 'updateEnrollment'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageToModifyAnActivity: String,
    pageToShowEnrollments: String,
    activity: Object,
    enrollment: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    dialogShow: false,
    buttons: [{
        type: 'default',
        text: '关闭',
        value: 0
      },
      {
        type: 'primary',
        text: '报名',
        value: 1
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChangeNickname(e) {
      this.data.enrollment.nickname = e.detail.value
    },

    onChangePrologue(e) {
      this.data.enrollment.prologue = e.detail.value
    },

    onTapToNavigate(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },

    onTapToCancelEnroll(e) {
      this.data.enrollment.status = '已取消报名'
      this.triggerEvent(eventName, {
        activityId: this.data.enrollment.activityId,
        status: this.data.enrollment.status
      })
    },

    onTapToOpenDialog(e) {
      this.setData({
        dialogShow: true
      })
    },

    onTapDialogButton(e) {
      switch (e.detail.item.value) {
        case 1:
          {
            this.data.enrollment.status = '已报名'
            this.triggerEvent(eventName, {
              activityId: this.data.enrollment.activityId,
              status: this.data.enrollment.status,
              nickname: this.data.enrollment.nickname,
              prologue: this.data.enrollment.prologue,
            })

            break
          }
      }

      this.setData({
        dialogShow: false
      })
    }

  }
})