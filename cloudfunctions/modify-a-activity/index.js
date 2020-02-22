// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  const activity = Object.assign({
    _modifiedAt: new Date()
  }, event)

  await db
    .collection('activities')
    .add({
      data: activity
    })
}