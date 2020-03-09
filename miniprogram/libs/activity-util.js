const dateTimeUtil = require('date-time-util.js')

exports.localizeDateTime = (activity, now, simplify) => {
  const display = activity ? Object.assign({}, activity) : null
  if (activity) {
    if (activity.startDate != null && activity.startTime != null && activity.dateTimeOffset != null) {
      const dateTime = dateTimeUtil.assembleDateObject(activity.startDate, activity.startTime, activity.dateTimeOffset)
      const d = dateTimeUtil.assembleDisplay(dateTime, now, simplify)
      display.startDateString = d.dateString
      display.startTimeString = d.timeString
    }
    if (activity.endDate != null && activity.endTime != null && activity.dateTimeOffset != null) {
      const dateTime = dateTimeUtil.assembleDateObject(activity.endDate, activity.endTime, activity.dateTimeOffset)
      const d = dateTimeUtil.assembleDisplay(dateTime, now, simplify)
      display.endDateString = d.dateString
      display.endTimeString = d.timeString
    }
    if (activity.deadlineDate != null && activity.deadlineTime != null && activity.dateTimeOffset != null) {
      const dateTime = dateTimeUtil.assembleDateObject(activity.deadlineDate, activity.deadlineTime, activity.dateTimeOffset)
      const d = dateTimeUtil.assembleDisplay(dateTime, now, simplify)
      display.deadlineDateString = d.dateString
      display.deadlineTimeString = d.timeString
    }
    display.dateTimeOffset = now.getTimezoneOffset()
  }
  return display
}