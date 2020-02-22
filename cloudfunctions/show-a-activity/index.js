// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database()

  const entities = await db
    .collection('my-activities')
    .where({
      _id: event._id,
    })
    .get()

  if (entities.data.length > 0) {
    return entities.data[0]
  }
  return null
}