// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const data = Object.assign({}, event, {
    _modifiedAt: new Date()
  })
  delete data._id

  const collection = cloud
    .database()
    .collection('enrollments')
  const docs = await collection
    .where({
      activityId: event.activityId
    })
    .get()
  for (doc of docs.data) {
    await collection
      .doc(doc._id)
      .update({
        data: data
      })
  }
}