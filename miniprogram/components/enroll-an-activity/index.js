const eventName = 'updateEnrollment'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageToModifyAnActivity: String,
    pageToShowEnrollments: String,
    activity: Object,
    enrollment: Object,
    isExpire: Boolean,
    isFull: Boolean
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
    onChangeNickName(e) {
      this.data.enrollment.nickName = e.detail.value
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
        _id: this.data.enrollment._id,
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
              _id: this.data.enrollment._id,
              status: this.data.enrollment.status,
              nickName: this.data.enrollment.nickName,
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