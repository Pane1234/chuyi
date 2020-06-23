//index.js
//获取应用实例
const app = getApp()
const httputils = require("../../utils/htttputils.js")
Page({
  data: {
    modalName:"",// 是否展示模态框，如果值为Modal，显示否则不显示
    isLoading:true,// 是否显示加载
    foodList:[],// 首页食物列表
    img:[]
  },
  onLoad:function(){
    this.getData()
  },
  // 展示模态框的方法
  showModel:function(e){
    console.log(e)
    this.setData({
      modalName:"Modal"
    })
  },
  // 关闭模态框的方法
  hideModal:function(){
    this.setData({
      modalName:""
    })
  },
  // 点击卡片的方法
  toDetail:function(e){
    var foodid = e.currentTarget.dataset.foodid
    console.log("点击了id为"+foodid+"的卡片")
    wx.navigateTo({
      url: '../detail/detail?foodid='+foodid,
      success: (result) => {
        console.log("请进入详情页")
      },
    })
  },
  // 点击搜索的方法
  getFoodList:function(e){
    wx.navigateTo({
      url: '../search/search',
      success: (result) => {},
    })
  },
  // 下拉刷新的方法
  onPullDownRefresh:function(){
  },
  // 获取数据的方法
  getData:function(){
    httputils('juno/api/v2/recipes/popular_v3.json',"GEt",{offset:0,limit:20,is_weapp:1,weapp_src:'xcf'},).then((res) =>{
      console.log("打开首页获取到数据:")
      console.log(res)
      this.setData({
        foodList:res.data.content.recipes,
        isLoading:false
      })
    }).catch((res)=>{
      console.log("错误:"+res)
    })
  },
  mealClick:function(e){
    wx.navigateTo({
      url: '../search/search?keyword='+e.currentTarget.dataset.meal,
    })
  }
})
