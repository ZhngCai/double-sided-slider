Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 筛选,过滤
    slider: {
      sliderMinLeft: 0, // 左滑块滑动比例  number
      sliderMinValue: 0, //价格滑块最小值   number
      sliderMaxLeft: 100, //右滑块滑动比例  number
      sliderMaxValue: 5000, //价格滑块最大值  number
      isUnlimite:1,     //最大值是否为不限  0 OR 1
      step: 1000,               //间距    number
    },
  },
  moveComSlider(e) {
    var that = this;
    this.setData({
      slider: {
        sliderMinLeft: e.detail.sliderMinLeft, //滑块滑动比例
        sliderMinValue: e.detail.sliderMinValue, //价格滑块最小值
        sliderMaxLeft: e.detail.sliderMaxLeft, //滑块滑动比例
        sliderMaxValue: e.detail.sliderMaxValue == '不限' ? "不限" : e.detail.sliderMaxValue, //价格滑块最大值
        step:e.detail.step,
        isUnlimite:e.detail.isUnlimite
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})