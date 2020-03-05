// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  const activities = await db
    .collection('activities')
    .where({
      _id: event.activityId,
    })
    .get()

  const enrollments = await db
    .collection('enrollments')
    .where({
      _createdBy: wxContext.OPENID,
      activityId: event.activityId,
    })
    .get()

  const data = {
    activity: activities.data.length > 0 ? activities.data[0] : null,
    enrollment: enrollments.data.length > 0 ? enrollments.data[0] : null,
    me: wxContext.OPENID
  }
  return data
}