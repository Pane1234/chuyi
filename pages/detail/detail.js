const httputils = require("../../utils/htttputils.js")
Page({
  data:{
    foodid:'',// 食物的id
    isLoading:true,// 是否正在加载
    foodDetail:[],// 详情页获取到的数据
    isShow: true
  },
  onLoad:function(e){
    console.log("detail>>>onLoad")
    this.setData({
      foodid:e.foodid
    })
    httputils('juno/api/v2/recipes/lookup.json','get',{
        id:e.foodid,
        is_weapp:1,
        weapp_src:"xcf"
      }).then(res=>{
        console.log(res)
        this.setData({
          foodDetail:res.data,
          isLoading:false
        })
      })
  },
  clk() {
    this.setData({
      'isShow': !this.data.isShow
    })
  },
})