// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  const data = Object.assign({}, event.activity, {
    _modifiedAt: new Date()
  })
  delete data._id

  await db
    .collection('activities')
    .doc(event.activity._id)
    .update({
      data: data
    })
}