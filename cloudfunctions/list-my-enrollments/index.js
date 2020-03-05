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
      _createdBy: wxContext.OPENID,
      deleted: _.neq(true)
    })
    .lookup({
      from: "activities",
      localField: "activityId",
      foreignField: "_id",
      as: "activities"
    })
    .end()

  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  const data = enrollments.list
    .filter(a => a.activities && a.activities.length > 0)
    .map(a => {
      let d = Object.assign({}, a, {
        activity: a.activities[0]
      })
      delete d.activities

      if (d.activity.startDate && d.activity.startTime) {
        const startDateTime = new Date(d.activity.startDate + ' ' + d.activity.startTime)
        const weekday = weekdays[startDateTime.getDay()]
        d.activity.weekday = weekday
        if (startDateTime.getFullYear() == new Date().getFullYear()) {
          d.activity.startDate = d.activity.startDate.substr(5)
        }

        if (d.activity.endDate && d.activity.endTime) {
          const end = new Date(d.activity.endDate + ' ' + d.activity.endTime)
          const timespan = end - startDateTime
          d.activity.timespan = format(timespan)
        }
      }
      return d
    })

  return data
}

function format(value) {
  //计算出相差天数 
  const days = Math.floor(value / (24 * 3600 * 1000))
  //计算出小时数
  const leave1 = value - days * 24 * 3600 * 1000
  const hours = Math.floor(leave1 / (3600 * 1000))
  //计算相差分钟数 
  const leave2 = leave1 - hours * 3600 * 1000
  const minutes = Math.floor(leave2 / (60 * 1000))

  const array = [
    [days, '天'],
    [hours, '小时'],
    [minutes, '分钟']
  ]
  const start = array.findIndex(n => n[0] > 0)
  array.reverse()
  const end = array.length - array.findIndex(n => n[0] > 0)
  array.reverse()
  const timespan = array.slice(start, end).reduce((a, b) => a + b[0] + b[1], '')
  return timespan
}