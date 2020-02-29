// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database()

  await db
    .collection('history')
    .add({
      data: {
        nickName: event.userInfo.nickName,
        function_name: context.function_name
      }
    })

  const activities = await db
    .collection('activities')
    .where({
      _id: event._id,
    })
    .get()

  return activities.data[0]
}