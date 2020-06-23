const httputils = require("../../utils/htttputils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    httputils("juno/api/v2/categories/tree_plus.json?is_weapp=1&weapp_src=xcf","get").then(result=>{
      this.setData({
        itemList:result.data.content
      })
    })
  },
  toSearchres:function(e){
    wx.navigateTo({
      url: '../search/search?keyword='+e.currentTarget.dataset.keyword,
    })
  }
})