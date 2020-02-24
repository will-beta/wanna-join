// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database()

  await db
    .collection('my-activities')
    .doc(event._id)
    .update({
      data: {
        deleted: true
      }
    })
}