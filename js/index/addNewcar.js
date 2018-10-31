

$(function(){
    var all = sessionStorage.getItem('cart_licens');
    if(all){
        all = JSON.parse(all);
        
        $('.dianji').text(all.All).removeClass('che_text_spac')
    }
    // 验证车牌号
    // function chePais(data){
    //   var reg = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/;
    //   if(reg.test(data)){
    //     return true;
    //   }
    //   return false;
    // }

    //验证手机号
    function Number(theObj) {
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;  
      if (reg.test(theObj)) {
        return true;
      }
      return false;
    }
        //地址弹出层
    var pops = document.getElementById("pop_bottom");
    var mask = mui.createMask(function() {
      pops.classList.remove("mui-active");
      $('.mui-icon-arrowdown').show();
      $('.mui-icon-arrowup').hide();
    });
    $(".addcar_plate").on("tap", function() {
        $('.mui-icon-arrowdown').hide();
        $('.mui-icon-arrowup').show();

      mask.show();
      // 显示
      pops.classList.toggle("mui-active");
    });
    $('.order_botPover .order_carry').on('tap','span',function(){
      var text = $(this).text();
      console.log(text)
      
      $('.addcar_plate .province').text(text);

      pops.classList.toggle("mui-active");
      mask.close();
    })

    //跳转到 选择车辆品牌页面
    $(".dianji").on("tap", function() {
      console.log('heh');
      sessionStorage.removeItem('where');
      var tel = $('.phone').val();
      var telname = $('.user_name').val();
      var mile = $('.last_mile').val();
      ziding.tel = tel;
      ziding.telname = telname;
      ziding.mile = mile;
      console.log(ziding);
      sessionStorage.setItem('ziding',JSON.stringify(ziding));
      location.href= "./message/brand.html";
      
    });
    // 拿到添加新车时的车牌
    var ziding = sessionStorage.getItem('ziding');
    if(ziding){
      ziding = JSON.parse(ziding);
      var vals = ziding.chepai;
      var option = ziding.option;
      $('.paizi').val(vals);
      $('.province').text(option);
      $('.phone').val(ziding.tel);
      $('.user_name').val(ziding.telname);
      $('.last_mile').val(ziding.mile);
    }
    //跳转封装
    function tiaozhuan(searchs){
      var user_name,type_id,last_mile;
      var chepai = $('.province').text()+$('.paizi').val();
      var phone = $('.phone').val();
      last_mile = $('.last_mile').val();
      user_name = $('.user_name').val();
      if(!!all){
        type_id = all.type_id;
      }
      if(!$('.paizi').val()){
        mui.toast('请输入正确车牌号');
        return false;
      }
      if(!!phone){
        if(!Number(phone)){
          mui.toast('请输入正确手机号');
          return false;
        }
        $.ajax({
          url:api+'smobileAddNewUser',
          type:'post',
          headers:{'sellermobileauthkey':token},
          beforeSend:function(){
            $('.loading').show()
          },
          data:{
              store_id: store_id,
              phone:	phone ,
              cart_licens:chepai, 
              user_name:user_name,  //姓名
              type_id:type_id,      //车型id
              last_mile:last_mile   // 公里数
          },
          success:function(data){
              $('.loading').hide()
              console.log(data);
              if(data.result){
                  mui.toast(data.msg)
                  var carObj = {cart_licens:chepai,nav_iphone:phone,cartid:data.data.cart_id,userid:data.data.user_id,carMan:'',type:3};
                  sessionStorage.setItem('carObj',JSON.stringify(carObj))
                  sessionStorage.removeItem('cart_licens');
                  sessionStorage.removeItem('ziding');
                  console.log(carObj);
                  console.log(searchs);
                  
                  location.href = searchs;
              }else{
                  mui.toast(data.msg);
              }
              if(data.code ==1001){
                  mui.alert('您的登录已失效',function(){
                      localStorage.removeItem('userObj');
                      // location.href="../index.html"
                  })
              }
          }
        }); 
      }
      else{
        $.ajax({
          url:api+'smobileAddNewUser',
          type:'post',
          headers:{'sellermobileauthkey':token},
          beforeSend:function(){
            $('.loading').show()
          },
          data:{
              store_id: store_id,
              phone:	phone ,
              cart_licens:chepai, 
              user_name:user_name,  //姓名
              type_id:type_id,      //车型id
              last_mile:last_mile   // 公里数
          },
          success:function(data){
              $('.loading').hide()
              console.log(data);
              if(data.result){
                  mui.toast(data.msg)
                  var carObj = {cart_licens:chepai,nav_iphone:phone,cartid:data.data.cart_id,userid:data.data.user_id,carMan:'',type:3};
                  sessionStorage.setItem('carObj',JSON.stringify(carObj));
                  sessionStorage.removeItem('cart_licens');   //  删除车型的信息
                  sessionStorage.removeItem('ziding');        //  删除新增车子的页面信息
                  location.href = searchs;
              }else{
                  mui.toast(data.msg)
              }
              if(data.code ==1001){
                  mui.alert('您的登录已失效',function(){
                      localStorage.removeItem('userObj');
                      // location.href="../index.html"
                  })
              }
          }
        }); 
      }
    }

    $('.goHomes').on('tap',function(){
      var searchs = "../index.html"
      tiaozhuan(searchs)
    })
    $('.openOrder').on('tap',function(){
      var searchs = "./reception.html"
      tiaozhuan(searchs)
    })
    
})