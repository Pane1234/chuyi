const httputils = require("../../utils/htttputils.js")
Page({
  data:{
    modalName:"",// 是否展示模态框，如果值为Modal，显示否则不显示
    isLoading:false,// 是否显示加载
    keyWords:[], // 热门搜索关键词
    searchWord:"", // 输入框的值
    preselectedWords:{},// 预选词
    isResult:false,//是否显示结果
  },
  onLoad:function(e){
    console.log(e.keyword)
    //获取热门搜索关键词
    this.getKeyWords()
    // 如果点击带有关键词进入搜索页，直接显示搜索结果
    if(e.keyword){
      this.searchData(e.keyword)
    }else{
      
    }
  },
  // 获取热门搜索关键词的方法
  getKeyWords:function(){
    httputils('juno/api/v2/search/keyword_hour.json','get',{is_weapp:1,
      weapp_src:"xcf"}).then(res=>{
      let a = res.data.content.keywords
        this.setData({
          keyWords:a.slice(0,20)
        })
    })
  },
  // 点击关键词的方法
  toSearchres:function(e){
    console.log("点击了热门标签")
    console.log(e)
    var keyword = e.currentTarget.dataset.keyword
    this.searchData(keyword)
  },
  // 实时获取输入框的值
  searchWordInput:function(e){
    this.setData({
      searchWord:e.detail.value
    })
    if(e.detail.value==''){
      this.setData({
        preselectedWords:{}
      })
    }else{
      // 获取预选词
      httputils("juno/api/v2/search/prefix_keyword_suggester.json","get",{
        q:this.data.searchWord,
        search_type:1001,
        is_weapp:1,
        weapp_src:'xcf' 
      }).then(res=>{
        this.setData({
            preselectedWords:res.data.content.keywords
          })
      })
    }
    
  },
  // 获取焦点的方法,显示结果为false
  hasfocus:function(e){
    this.setData({
      isResult:false
    })
  },
  // 搜索数据的方法
  searchData:function(e){
    this.setData({
      isLoading:true
    })
    httputils(
      "juno/api/v2/search/universal_search_v2.json",
      "POST",
      {"q": e,"cursor": "","order_by": "","size": 20,"search_type": 1091,"is_weapp": 1,"weapp_src": "xcf"}
    ).then(res=>{
      console.log(res)
      this.setData({
        resList:res.data.content.content,
        isResult:true,
        searchWord:e,
        isLoading:false
      })
    })
 },
  // 点击搜索的方法
  searchCilck:function(){
    this.searchData(this.data.searchWord)
  },
  // 点击取消的方法
  cancelClick:function(){
    wx.navigateBack()
  },
  // 点击预选词的方法
  pWordsClick:function(e){
    this.searchData(e.currentTarget.dataset.keyword)
    this.setData({
      searchWord:e.currentTarget.dataset.keyword
    })
  },
  // 点击结果的方法
  toDetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?foodid='+e.currentTarget.dataset.foodid,
      complete: (res) => {},
      fail: (res) => {},
      success: (result) => {},
    })
  }

})