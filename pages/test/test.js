Page({
  data: {
    isShow: true,
    arr: [
      {txt: 1},
      {txt: 2},
      {txt: 3}
    ]
  },
 clk() {
    this.setData({
      'isShow': !this.data.isShow
    })
  },
})