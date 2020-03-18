// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database()

  const data = Object.assign({}, event, {
    _modifiedAt: new Date()
  })
  delete data._id

  const collection = db.collection('enrollments')
  const docs = await collection
    .doc(event._id)
    .update({
      data: data
    })
}