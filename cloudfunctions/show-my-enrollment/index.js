// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
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

  const exisitingCount = await db.collection('enrollments')
    .where({
      _createdBy: wxContext.OPENID,
      activityId: event.activityId
    })
    .count()
  if (exisitingCount.total == 0) {
    await db.collection('enrollments')
      .add({
        data: {
          _createdAt: new Date(),
          _createdBy: wxContext.OPENID,
          activityId: event.activityId,
          userInfo: event.userInfo,
          status: '已阅'
        }
      })
  }

  const activities = await db
    .collection('activities')
    .where({
      _id: event.activityId,
    })
    .get()
  const enrollments = await db
    .collection('enrollments')
    .where({
      activityId: event.activityId
    })
    .orderBy('status', 'asc')
    .get()

  const data = {
    activity: activities.data.length > 0 ? activities.data[0] : null,
    enrollments: enrollments.data,
    me: wxContext.OPENID,
    isOverdue: false,
    isExcess: false
  }
  if (data.activity) {
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
  }
  return data
}