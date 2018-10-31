mui(".mui-scroll-wrapper").scroll({
  // indicators: false,
  bounce: true,
  indicators: true, //是否显示滚动条
});
//轮播图
mui(".mui-slider").slider({
  interval: 2000
});


var api ='http://api.carlub.com.cn/';
var userObj = localStorage.getItem('userObj');
var token,store_id,is_boss,name,fatherSeller_id;
if(userObj){
  userObj = JSON.parse(userObj);
  token = userObj.token;
  store_id = userObj.store_id;
  is_boss = userObj.is_boss;
  name = userObj.name;
  fatherSeller_id = userObj.seller_id
}else{
  mui.alert('您未登录',function(){
    location.href = "/login.html"

  })
}
// var token = localStorage.getItem('token');
// var store_id = localStorage.getItem('store_id');
console.log(token);
// console.log(is_boss);
$(function(){
  // 数组去重
  Array.prototype.distinct = function(){
    var arr = this,
      result = [],
      i,
      j,
      len = arr.length;
    for(i = 0; i < len; i++){
      for(j = i + 1; j < len; j++){
      if(arr[i] === arr[j]){
        j = ++i;
      }
      }
      result.push(arr[i]);
    }
    return result;
  }
  //验证手机号
  function Number(theObj) {
    var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;  
    if (reg.test(theObj)) {
      return true;
    }
    return false;
  }
  //验证车牌
  function chePais(data){
      var reg = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/;
      if(reg.test(data)){
        return true;
      }
      return false;
    }
  version();
  function version(){
    $('script').each(function(v,i){
      $(this).attr('src',$(this).attr('src')+'?v=1.2.5')
    });
    $('link').each(function(val,index){
      $(this).attr('href',$(this).attr('href')+'?v=1.2.5');
    })
  
  }
})
