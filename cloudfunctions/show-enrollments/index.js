// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

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

  const activity = activities.data.length > 0 ? activities.data[0] : null
  const data = {
    enrollments: enrollments.data
  }
  return data
}