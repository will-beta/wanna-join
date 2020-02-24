// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database()

  const activities = await db
    .collection('activities')
    .where({
      _id: event._id,
    })
    .get()

  return activities.data[0]
}