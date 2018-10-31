


$(function(){
    $.ajax({
        url:api+"smobileOrderList",
        type:'post',
        headers:{'sellermobileauthkey':token},
        beforeSend:function(){
            $('.loading').show()
        },
        data:{store_id:store_id},
        success:function(data){
            console.log(data);
            // $.each(data.data,function(v,i){
            //     console.log(i.cartList.cart_licens + v);

            // })
            $('.loading').hide()
            $('.che_main').show()
            if(data.result){
                $('.tosuit_main').html(template('tpls',data))
            }
        }
    })
    $('.che_main').on('tap','.tosuit_top',function(){
        var order_id = $(this).data('id');
        console.log(order_id);
        sessionStorage.setItem('order_id',order_id)
        location.href="./shangpin/orderProduct.html";
    })
})