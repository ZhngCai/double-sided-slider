// pages/slideBar/slideBar.js
var utilMain = require('../../../utils/main.js');
/**
 * sliderMin  最小值
 * sliderMax  最大值
 * sliderMinValue  当前最小取值
 * sliderMinValue  当前最大取值、
 * step       步长，取值必须大于 0，并且可被(max - min)整除
 * 
 */
Component({
  properties: {
    sliderMin: {
      type: Number,
    },
    sliderMax: {
      type: Number,
    },
    sliderMinValue:{
      type: Number,
    },
    sliderMaxValue:{
      type: Number,
    },
    step: {
      type: Number,
    },
  },

  /**
   * 页面的初始数据
   */
  data: {
    slider: {
      sliderMin:0,
      sliderMax:100,
      sliderMinLeft: 0, 
      sliderMinValue: 0, 
      sliderMaxLeft: 100, 
      sliderMaxValue: 5000, 
      step:1
    },
    stepDis:0,
    sliderInnerWidth:0,   //横条宽度
    touchStart:0,
    touchStartValue:0,
  },
  ready(e) {

    let query = wx.createSelectorQuery().in(this);
    let that = this;
    if (this.properties.sliderMinLeft < 0 | this.properties.sliderMinLeft>=100){
      wx.showToast({
        icon:"none",
        title: 'sliderMinLeft 不能小于0',
      })
      return false;
    }
    if (this.properties.sliderMaxLeft <= 0 | this.properties.sliderMaxLeft>100){
      wx.showToast({
        icon: "none",
        title: 'sliderMaxLeft 不能大于100',
      })
      return false;
    }
    query.select('#sliderInner').boundingClientRect(function (res) {
      let stepDis = res.width / (that.properties.sliderMax - that.properties.sliderMin);
      that.setData({
        sliderInnerWidth: res.width,
        stepDis,
        'slider.sliderMin': that.properties.sliderMin,
        'slider.sliderMax': that.properties.sliderMax,
        'slider.sliderMinLeft': that.properties.sliderMinValue * stepDis,
        'slider.sliderMaxLeft': that.properties.sliderMaxValue * stepDis,
        'slider.sliderMinValue': that.properties.sliderMinValue,
        'slider.sliderMaxValue': that.properties.sliderMaxValue,
        'slider.step': that.properties.step
      })
    }).exec()
  },
  methods: {
    onLoad() {
      this.data.step;
    },
    touchSlider(e) {
      let query = wx.createSelectorQuery().in(this);
      let that = this;
      if (e.currentTarget.dataset.id == 'sliderHandlerMax') {
        query.select('#sliderHandlerMax').boundingClientRect(function (res) {
          that.setData({
            touchStart: e.touches[0].clientX,
            touchStartValue: that.data.slider.sliderMaxValue
          })
        }).exec()
      } else if (e.currentTarget.dataset.id == 'sliderHandlerMin') {
        query.select('#sliderHandlerMin').boundingClientRect(function (res) {
          that.setData({
            touchStart: e.touches[0].clientX,
            touchStartValue: that.data.slider.sliderMinValue
          })
        }).exec()
      } else {

      }

    },
    moveSlider(e) {
      var that = this;
      let minValue = this.data.slider.sliderMinValue,
          min = this.data.slider.sliderMin,
          maxValue = this.data.slider.sliderMaxValue,
          max = this.data.slider.sliderMax,
          _s = this.data.slider.step;
      let _dis = e.touches[0].clientX - this.data.touchStart, 
        stepDis = this.data.stepDis;
      let minLeft = minValue * stepDis,
          maxLeft = maxValue * stepDis,
          touchLeft = this.data.touchStartValue * stepDis ;
      if (e.currentTarget.dataset.id == 'sliderHandlerMax') {
        let oLeft = touchLeft + Math.round(_dis / (stepDis*_s)) * (stepDis*_s);
        if (oLeft > this.data.sliderInnerWidth) {
          oLeft = this.data.sliderInnerWidth;
        } else if (oLeft <= minLeft){
          oLeft = minLeft + stepDis*_s;
        }else{
          
        }
        maxLeft = oLeft;
        maxValue = Math.round(maxLeft / stepDis);
      } else {
        let oLeft = touchLeft + Math.round(_dis / (stepDis * _s)) * (stepDis * _s);
        if (oLeft < 0) {
          oLeft = 0;
        }
        if (oLeft >= maxLeft){
          oLeft = maxLeft - stepDis*_s;
        }
        minLeft = oLeft;
        minValue = Math.round(minLeft / stepDis);
      }

      this.setData({
          'slider.sliderMinLeft': minLeft, //滑块滑动比例
          'slider.sliderMinValue': minValue, //价格滑块最小值
          'slider.sliderMaxLeft': maxLeft, //滑块滑动比例
          'slider.sliderMaxValue': maxValue, //价格滑块最大值
      })
    },
    endSlider(e) {
    }
  }
  

})