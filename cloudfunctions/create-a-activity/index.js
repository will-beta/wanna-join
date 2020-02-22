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
      data: {
        _createdAt: Date(),
        _createdBy: wxContext.OPENID,


        title: event.title,
        description: event.description,
        startDate: event.startDateTime,
        endDate: event.endDateTime,
        deadlineDate: event.deadlineDateTime,
        location: event.location,
        maxCount: event.maxCount,

        userInfo: event.userInfo,
      }
    })

  await db
    .collection('my-activities')
    .add({
      data: {
        _createdAt: Date(),
        _createdBy: wxContext.OPENID,
        activityId: activity._id,
        status: '已阅'
      }
    })
}