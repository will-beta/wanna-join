// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  const myActivities = await db
    .collection('my-activities')
    .where({
      _createdBy: wxContext.OPENID
    })
    .get()

  const myActivityIds = myActivities.data.map(d => d.activityId)

  const entities = await db
    .collection('activities')
    .where({
      _id: db.command.in(myActivityIds),
    })
    .orderBy('startTime', 'desc')
    .limit(100)
    .get()

  return entities.data
}