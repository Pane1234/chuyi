const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userData:{},
    isLogin:false
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success:  (res)=> {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success:  (res)=> {
              // 用户已经授权过,调用微信的 wx.login 接口
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                }
              });
              console.log(res)
              this.setData({
                userData:res.userInfo,
                isLogin:true
              })
            }
          });
        } else {
          // 用户没有授权，显示授权页面,这里不进行操作
        }
      }
    });
  },
  // 点击授权登录按钮
  bindGetUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      this.setData({
        userData:e.detail.userInfo,
        isLogin:true
      })
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '取消登录',
        showCancel: false,
        confirmText: '返回',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回”');
          }
        }
      });
    }
  },
  // 点击关于
  toabout:function(e){
    wx.navigateTo({
      url: 'about/about'
    })
  }
})