// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  const activities = await db.collection('activities').get()
  for (const activity of activities.data) {
    await db.collection('activities')
      .doc(activity._id)
      .update({
        data: {
          dateTimeOffset: -480
        }
      })
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}