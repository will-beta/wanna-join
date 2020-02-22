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
        _createdAt: new Date(),
        _createdBy: wxContext.OPENID,


        title: event.title,
        description: event.description,
        startDateTime: (event.startDate || event.startTime) ? [event.startDate, event.startTime].join(' ') : null,
        endDateTime: (event.endDate || event.endTime) ? [event.endDate, event.endTime].join(' ') : null,
        deadlineDateTime: (event.deadlineDate || event.deadlineTime) ? [event.deadlineDate, event.deadlineTime].join(' ') : null,
        location: event.location,
        maxCount: event.maxCount,

        userInfo: event.userInfo,
      }
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