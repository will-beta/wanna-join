// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  await db
    .collection('history')
    .add({
      data: {
        nickName: event.userInfo.nickName,
        function_name: context.function_name
      }
    })

  const activities = await db
    .collection('activities')
    .where({
      _id: event.activityId,
    })
    .get()

  const collection = db.collection('enrollments')
  while (true) {
    const enrollments = await collection
      .where({
        activityId: event.activityId
      })
      .orderBy('status', 'asc')
      .get()

    if (enrollments.data.every(d => d._createdBy != wxContext.OPENID)) {
      await collection
        .add({
          data: {
            _createdAt: new Date(),
            _createdBy: wxContext.OPENID,
            activityId: event.activityId,
            userInfo: event.userInfo,
            status: '已阅'
          }
        })
      continue
    }

    const data = {
      activity: activities.data[0],
      enrollments: enrollments.data,
      me: wxContext.OPENID,
      isOverdue: false,
      isExcess: false
    }
    if (data.activity.deadlineDate) {
      const deadline = new Date(data.activity.deadlineTime ? [data.activity.deadlineDate, data.activity.deadlineTime].join(' ') : data.activity.deadlineDate)
      if (deadline <= new Date())
        data.isOverdue = true
    }
    if (data.activity.maxEnrollmentCount >= 0) {
      const current = data.enrollments.filter(e => e.status == '已报名').length;
      if (current >= data.activity.maxEnrollmentCount)
        data.isExcess = true
    }
    return data
  }
}