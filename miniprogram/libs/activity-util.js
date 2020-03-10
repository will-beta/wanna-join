const dateTimeUtil = require('date-time-util.js')

exports.localizeDateTime = (activity, now, simplify) => {
  const display = activity ? {} : null
  if (activity) {
    if (activity.startDate != null && activity.startTime != null && activity.dateTimeOffset != null) {
      const dateTime = dateTimeUtil.assembleDateObject(activity.startDate, activity.startTime, activity.dateTimeOffset)
      const d = dateTimeUtil.assembleDisplay(dateTime, now, simplify)
      display.startDate = d.date
      display.startTime = d.time
    }
    if (activity.endDate != null && activity.endTime != null && activity.dateTimeOffset != null) {
      const dateTime = dateTimeUtil.assembleDateObject(activity.endDate, activity.endTime, activity.dateTimeOffset)
      const d = dateTimeUtil.assembleDisplay(dateTime, now, simplify)
      display.endDate = d.date
      display.endTime = d.time
    }
    if (activity.deadlineDate != null && activity.deadlineTime != null && activity.dateTimeOffset != null) {
      const dateTime = dateTimeUtil.assembleDateObject(activity.deadlineDate, activity.deadlineTime, activity.dateTimeOffset)
      const d = dateTimeUtil.assembleDisplay(dateTime, now, simplify)
      display.deadlineDate = d.date
      display.deadlineTime = d.time
    }
    display.dateTimeOffset = now.getTimezoneOffset()
  }
  return display
}