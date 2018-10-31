

$(function(){
    //添加新车跳转
    // var store_id = localStorage.getItem('store_id')

    //取消右上角跳转
    $('.icon_right').on('tap',function(){
        console.log('kk');
        location.href = "./message/message.html"
    })
    //接待信息跳转
    $('.manual_main').on('tap','.manual_top',function(){
        var cartid = $(this).data('cartid');
        var userid = $(this).data('userid');
        var cart_licens = $(this).find('.cart_pai').text();
        console.log(cartid);
        console.log(userid);
        console.log(cart_licens);
        var carObj = {cartid:cartid,userid:userid,cart_licens:cart_licens,type:2};
        carObj = JSON.stringify(carObj)
        sessionStorage.setItem('carObj',carObj);

        // if(id==1){
            location.href = "./reception.html"
        // }
    })
    // loadRender($('.shanghai').text(),store_id)
    function loadRender(searchs,store_id){
        $.ajax({
            url:api+'smobileOrderSelectUser',
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
                $('.loading').show();
            },
            data:{
                keyword : searchs,
                store_id : store_id,
            },
            // headers:{"userauthkey":token},
            success:function(data){
                console.log(data);
                $('.loading').hide();
                if(data.result){
                    $('.manual_main').html(template('tpl',data))
                    if(data.data.length==0){
                        mui.toast('暂无数据,请添加新车')
                    }
                }else{
                    console.log('res')
                }
                if(data.code ==1001){
                    mui.alert('您的登录已失效',function(){
                        localStorage.removeItem('userObj');
                        location.href="/index.html"
                    })
                }
            },
            error:function(res){
                console.log(res)
            }
        })
    }
    // 参数：keyword，store_id  
    $('.search').on('input',function(){
        var searchs = $(this).val();
        var wheres = $('.shanghai').text();
        // console.log(searchs.toUpperCase()); // 转换英文大小写
        if(wheres == "请选择"){
            console.log('呵呵')
            loadRender(searchs,store_id);
            
        }else{
            var resval = wheres+searchs;
            loadRender(resval,store_id);

        }
        // var resval = $('.shanghai').text()+searchs;
        // loadRender(resval,store_id);
    })
    console.log(store_id)
    //弹出层
    var pops = document.getElementById("pop_bottom");
    var mask = mui.createMask(function() {
      pops.classList.remove("mui-active");
      $('.mui-icon-arrowdown').show();
      $('.mui-icon-arrowup').hide();
    });
    $(".vince").on("tap", function() {
        $('.mui-icon-arrowdown').hide();
        $('.mui-icon-arrowup').show();

      mask.show();
      // 显示
      pops.classList.toggle("mui-active");
    });
    $('.order_botPover .order_carry').on('tap','span',function(){
      var text = $(this).text();
      console.log(text)
      
      $('.shanghai').text(text);
      text = text+$('.search').val();
      loadRender(text,store_id);
      pops.classList.toggle("mui-active");
      mask.close();
    })

    // 新增车辆 
    $('.manual_main').on('tap','.clickNew',function(){
        console.log('jj')
        var chepai = $('.search').val();
        var option = $('.shanghai').text();
        var ziding = {chepai:chepai,option:option};
        sessionStorage.setItem('ziding',JSON.stringify(ziding));
        location.href = "./addNewcar.html";
    })
})