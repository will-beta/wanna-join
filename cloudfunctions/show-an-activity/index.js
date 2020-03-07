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

  const activity = activities.data.length > 0 ? activities.data[0] : null
  const enrollment = enrollments.data.length > 0 ? enrollments.data[0] : null
  const now = new Date()
  const data = {
    activity: activity,
    enrollment: enrollment,
    isExpire: false,
    isFull: false
  }
  if (activity) {
    if (activity.deadlineDate) {
      const deadline = new Date(activity.deadlineDate + 'T' + activity.deadlineTime + '+08:00')
      if (deadline <= now)
        data.isExpire = true
    }
    if (activity.maxEnrollmentCount >= 0) {
      const current = enrollments.data.filter(e => e.status == '已报名').length;
      if (current >= activity.maxEnrollmentCount)
        data.isFull = true
    }
  }
  return data
}