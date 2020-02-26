// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

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
    .get()

  const data = {
    activity: activities.data[0],
    enrollments: enrollments.data,
    me: wxContext.OPENID
  }
  return data
}