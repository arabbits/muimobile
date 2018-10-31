



$(function(){
    var order_id = sessionStorage.getItem('order_id');
                console.log(order_id);
    if(order_id){
        $.ajax({
            url:api+"smobileOrderDeatils",
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
                $('.loading').show()
            },
            data:{order_id:order_id},
            success:function(data){
                console.log(data);
                // $.each(data.data,function(v,i){
                //     console.log(i.cartList.cart_licens + v);
    
                // })
                $('.loading').hide()
                $('.che_main').show()
                if(data.result){
                    $('.tosuit_main').html(template('tpl',data))
                }
            }
        })

    }else{
        mui.alert('您未登录',function(){
            location.href = "/login.html"
        })
    }
})