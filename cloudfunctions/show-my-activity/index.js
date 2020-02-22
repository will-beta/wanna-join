// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  const myActivities = await db
    .collection('my-activities')
    .where({
      _id: event._id,
    })
    .get()

  const activities = await db
    .collection('activities')
    .where({
      _id: myActivities.data[0].activityId,
    })
    .get()

  const data = Object.assign(myActivities.data[0], {
    activity: activities.data[0]
  })

  return data
}