//封装请求
const host = "https://www.xiachufang.com/"

module.exports = (url,type,data) => {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: host+url,
      data: data,
      method: type,
      dataType: "json",
      success: resolve,
      fail: reject,
    })
  })
}
