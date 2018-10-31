



$(function(){
    var all = sessionStorage.getItem('cart_licens');
    if(all){
        all = JSON.parse(all);
        $('.dianji').text(all.All).removeClass('che_text_spac')
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
    //验证姓名
    function Names(theObj) {
        var reg = /^([\u4e00-\u9fa5]){2,7}$/;
        if (reg.test(theObj)) {
            return true;
        }
        return false;
    }
    //跳转到 选择车辆品牌页面
    $(".dianji").on("tap", function() {
        console.log('heh');
        sessionStorage.removeItem('where');
        location.href= "brand.html";
     
    });
    $('.goHomes').on('tap',function(){
        var text = $('.province').text()+$('.paizi').val();
        var phone = $('.phone').val();
        var name = $('.name').val();
        var carstyle = $('.dianji').text();
        if(!text ||!phone || !name || !carstyle){
            mui.toast('信息不能为空!')
        }else if(!Number(phone)){
            mui.toast('手机号码不合法');
        }else if(!chePais(text)){
            mui.toast('车牌不合法');
        }else if(!Names(name)){
            mui.toast('姓名不合法');
        }else{
            console.log('成功')
        }

    })
})