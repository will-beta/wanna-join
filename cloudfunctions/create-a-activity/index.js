// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  const activity = await db
    .collection('activities')
    .add({
      data: Object.assign({
        _createdAt: new Date(),
        _createdBy: wxContext.OPENID,
      }, event)
    })

  await db
    .collection('my-activities')
    .add({
      data: {
        _createdAt: new Date(),
        _createdBy: wxContext.OPENID,
        activityId: activity._id,
        userInfo: event.userInfo,
        status: '已阅'
      }
    })
}