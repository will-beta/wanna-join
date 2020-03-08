const dateTimeUtil = require('date-time-util.js')

exports.localizeDateTime = (activity, now) => {
  const display = activity ? Object.assign({}, activity) : null
  if (activity) {
    if (activity.startDate != null && activity.startTime != null && activity.dateTimeOffset != null) {
      const dateTime = dateTimeUtil.assembleDateObject(activity.startDate, activity.startTime, activity.dateTimeOffset)
      const d = dateTimeUtil.assembleDisplay(dateTime, true, now)
      display.startDateString = d.dateString
      display.startTimeString = d.timeString
    }
    if (activity.endDate != null && activity.endTime != null && activity.dateTimeOffset != null) {
      const dateTime = dateTimeUtil.assembleDateObject(activity.endDate, activity.endTime, activity.dateTimeOffset)
      const d = dateTimeUtil.assembleDisplay(dateTime, true, now)
      display.endDateString = d.dateString
      display.endTimeString = d.timeString
    }
    if (activity.deadlineDate != null && activity.deadlineTime != null && activity.dateTimeOffset != null) {
      const dateTime = dateTimeUtil.assembleDateObject(activity.deadlineDate, activity.deadlineTime, activity.dateTimeOffset)
      const d = dateTimeUtil.assembleDisplay(dateTime, true, now)
      display.deadlineDateString = d.dateString
      display.deadlineTimeString = d.timeString
    }
    display.dateTimeOffset = new Date().getTimezoneOffset()
  }
  return display
}