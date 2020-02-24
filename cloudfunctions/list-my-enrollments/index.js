// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  const enrollments = await db
    .collection('enrollments')
    .aggregate()
    .match({
      deleted: _.neq(true)
    })
    .lookup({
      from: "activities",
      localField: "activityId",
      foreignField: "_id",
      as: "activities"
    })
    .end()

  const data = enrollments.list.map(a => {
    Object.assign(a, {
      activity: a.activities[0]
    })
    delete a.activities
    return a
  })

  return data
}