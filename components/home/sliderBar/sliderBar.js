// pages/slideBar/slideBar.js
var utilMain = require('../../../utils/main.js');

Component({
  properties: {
    sliderMinValue:{
      type: Number,
      value:0,
      observer: function(newVal, oldVal) {
          // 属性被改变时执行的函数（可选）
      }
    },
    sliderMinLeft:{
      type:Number,
      value:0,
      observer: function(newVal, oldVal) {
          // 属性被改变时执行的函数（可选）
      }
    },
    sliderMaxValue:{
      type: Number,
      value:100,
      observer: function(newVal, oldVal) {
          // 属性被改变时执行的函数（可选）
      }
    },
    sliderMaxLeft:{
      type:Number,
      value:100,
      observer: function(newVal, oldVal) {
          // 属性被改变时执行的函数（可选）
      }
    },
    step: {
      type: Number,
      value: 1000,
      observer: function (newVal, oldVal) {
        // 属性被改变时执行的函数（可选）
        
      }
    },
    isUnlimite: {
      type: Number,
      value: 1,
      observer: function (newVal, oldVal) {
        // 属性被改变时执行的函数（可选）
      }
    }

  },

  /**
   * 页面的初始数据
   */
  data: {
    stepDis:0,
    sliderValue:[0,'不限'],
    sliderInnerWidth:0,   //横条宽度
    trackMaxLeft:100,
    trackMinLeft: 0,
    touchStart:0,
    sliderMaxLeftStart: 0,
    sliderMaxLeftEnd: 100,
    sliderMaxLeftEnd: 0,
  },
  ready(e) {
    let query = wx.createSelectorQuery().in(this);
    let that = this;
    let min = this.properties.sliderMinValue, max = this.properties.sliderMaxValue, step = this.data.step;
    let valArr = [];

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
    this.setData({
      stepDis: (max - min) / step
    })
    for(;min < max;){
      valArr.push(min)
      min = min + step;
    }
    if(min>=max){
      if(this.properties.isUnlimite){
        valArr.push("不限");
      }else{
        valArr.push(max);
      }
    }

    this.setData({
      sliderValue:valArr
    })
    
    let minLeft, maxLeft;
    minLeft = Math.round(this.properties.sliderMinLeft / 100 * this.properties.stepDis) / this.properties.stepDis*100;
    maxLeft = Math.round(this.properties.sliderMaxLeft / 100 * this.properties.stepDis) / this.properties.stepDis * 100;
    this.triggerEvent('movecom', {
      sliderMinLeft: minLeft,
      sliderMaxLeft: maxLeft,
      step: that.properties.step,
      isUnlimite: that.properties.isUnlimite
    })
    query.select('#sliderInner').boundingClientRect(function (res) {
      that.setData({
        sliderInnerWidth: res.width,
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
            sliderMaxLeftStart: that.properties.sliderMaxLeft,
            touchStart: e.touches[0].clientX,
          })
        }).exec()
      } else if (e.currentTarget.dataset.id == 'sliderHandlerMin') {
        query.select('#sliderHandlerMin').boundingClientRect(function (res) {
          that.setData({
            sliderMinLeftStart: that.properties.sliderMinLeft,
            touchStart: e.touches[0].clientX,
          })
        }).exec()
      } else {

      }

    },
    moveSlider(e) {
      var that = this;
      let _dis = e.touches[0].clientX - this.data.touchStart;
      let minLeft = this.properties.sliderMinLeft, minValue = this.properties.sliderMinValue, maxLeft = this.properties.sliderMaxLeft, maxValue = this.properties.sliderMaxValue, _s = this.data.stepDis;
      if (e.currentTarget.dataset.id == 'sliderHandlerMax') {
        let oLeft = this.data.sliderMaxLeftStart + Math.floor(Math.ceil((Math.abs(_dis) * _s * 2) / this.data.sliderInnerWidth) / 2) / _s * 100 * _dis / Math.abs(_dis);
        
        if (oLeft > 100) {
          oLeft = 100;
        }else if(oLeft < 0){
          oLeft = 1 / _s*100;
        }else{
          oLeft = Math.abs(oLeft);
        }
        if (utilMain.fixTwo(oLeft) > utilMain.fixTwo(this.properties.sliderMinLeft)) {
          this.setData({
            trackMaxLeft: oLeft,
          })
          maxLeft = oLeft + 0;
          
          maxValue = oLeft >= 100 ? that.data.sliderValue[that.data.sliderValue.length - 1] : Math.round(oLeft * _s / 100) * this.data.step;
          
        }
      } else {
        let oLeft = this.data.sliderMinLeftStart + Math.floor(Math.ceil((Math.abs(_dis) * that.data.stepDis*2) / this.data.sliderInnerWidth) / 2) / _s * 100 * _dis / Math.abs(_dis);
        if (oLeft < 0) {
          oLeft = 0;
        }
        oLeft = Math.abs(oLeft);
        if (utilMain.fixTwo(oLeft) < utilMain.fixTwo(this.data.sliderMaxLeft)) {
          this.setData({
            trackMinLeft: oLeft,
          })
          minLeft = oLeft;
          minValue = Math.round(oLeft * _s / 100) * this.data.step;
        }
      }
      this.triggerEvent('movecom', {
        sliderMinLeft: minLeft,
        sliderMinValue:minValue,
        sliderMaxLeft: maxLeft,
        sliderMaxValue:maxValue,
        step:that.properties.step,
        isUnlimite: that.properties.isUnlimite
      })
    },
    endSlider(e) {
    }
  }
  

})