// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  const enrollments = await db
    .collection('enrollments')
    .where({
      activityId: event.activityId,
      _createdBy: wxContext.OPENID
    })
    .get()

  const activities = await db
    .collection('activities')
    .where({
      _id: enrollments.data[0].activityId,
    })
    .get()

  const data = {
    enrollment: enrollments.data[0],
    activity: activities.data[0]
  }
  return data
}