module.exports = {
  fixTwo(num) {
    return Math.floor(num * 100) / 100;
  },
  //去重
  distinct (array) {
    var result = [],
      len = array.length;
    array.map(function (v, i, arr) {
      var bool = arr.indexOf(v, i + 1); 
      if (bool === -1) {
        result.splice(array.indexOf(v),0,v);
      }
    })
    return result;
  },
  distinctJson(arr,argum){
     return arr.filter((ele,index,array) => array.findIndex((ele2)=> ele2[argum] == ele[argum]) == index)
  },
  
}