// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  /*
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
  */

  let myActivities = [{
    coverImage: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    title: "活动0",
    publisher: "大贝塔",
    startTime: "2020-1-0",
    location: {
      name: "海南",
      address: null
    },
    status: "已报名"
  }, {
    coverImage: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    title: "活动1",
    publisher: "大贝塔",
    startTime: "2020-1-1",
    location: {
      name: "浙江",
      address: null
    },
    status: "已报名"
  }, {
    coverImage: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    title: "活动2",
    publisher: "大贝塔",
    startTime: "2020-1-2",
    location: {
      name: "上海",
      address: null
    },
    status: "已报名"
  }, {
    coverImage: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    title: "活动3",
    publisher: "大贝塔",
    startTime: "2020-1-3",
    location: {
      name: "北京",
      address: null
    },
    status: "已报名"
  }]

  return myActivities
}