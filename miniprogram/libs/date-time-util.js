exports.assembleTimeSpan = (timespan) => {
  //计算出相差天数 
  const days = Math.floor(timespan / (24 * 3600 * 1000))
  //计算出小时数
  const leave1 = timespan - days * 24 * 3600 * 1000
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
  const timeSpanString = array.slice(start, end).reduce((a, b) => a + b[0] + b[1], '')
  return timeSpanString
}

exports.assembleDateObject = (dateString, timeString, dateTimeOffset) => {
  const dateNumbers = dateString.split('-').map(s => parseInt(s))
  const timeNumbers = timeString.split(':').map(s => parseInt(s))
  const dateObj = new Date(new Date(...dateNumbers, ...timeNumbers).getTime() - dateTimeOffset)
  return dateObj
}

exports.assembleDisplay = (dateTime, now, simplify) => {
  const addYear = !simplify || dateTime.getFullYear() != new Date().getFullYear()
  const dateString = (addYear ? dateTime.getFullYear() + '-' : '') + dateTime.getMonth().toString().padStart(2, '0') + '-' + dateTime.getDate().toString().padStart(2, '0')

  const timeString = dateTime.getHours().toString().padStart(2, '0') + ':' + dateTime.getMinutes().toString().padStart(2, '0')

  return {
    date: dateString,
    time: timeString
  }
}