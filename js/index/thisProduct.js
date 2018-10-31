$(function(){
    var cart_id = sessionStorage.getItem('allCar_id');

    console.log(cart_id)
    if(!cart_id){
        location.href = '/index.html'
    }else{
        $.ajax({
            url:api+"smobileGetUserCartInfo",
            type:"post",
            headers:{"sellermobileauthkey":token},
            beforeSend:function(){
                $('.loading').show()
            },
            data:{
                cart_id:cart_id,
            },
            success:function(data){
                $('.loading').hide();
                
                console.log(data);
                if(data.result){
                    $('.che_main').show()
                    
                    $('.tosuit_main').html(template('tpls',data))
                }else{
                    mui.toast(data.msg)
                    $('.volist').show()
                }
            }
        })
        $('.icon_left').on('tap',function(){
            sessionStorage.removeItem('allCar_id');
        })

    }
})