// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  const records = await cloud
    .database()
    .collection('my-activities')
    .where({
      _openid: wxContext.OPENID
    })
    .get()

  return records.data
}