// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const data = Object.assign({}, event, {
    _modifiedAt: new Date()
  })
  delete data._id

  const db = cloud.database()
  await db
    .collection('enrollments')
    .doc(event._id)
    .update({
      data: data
    })
}