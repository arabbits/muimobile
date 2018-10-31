$(function(){
    $('.addPro_father').on('tap',function(){
        $(this).find('.xuanze').addClass('ngv').parent().siblings().find('.xuanze').removeClass('ngv');
    })


    $('.addCommod').on('tap',function(){
        var shopname = $('.shopname').val(); // 商品名称
        // var onePrice = $('.onePrice').val(); // 商品价格
        var temp_num = $('.temp_num').val(); // 接单人提成
        var lingliao = $('.lingliao').val(); // 领料人提成
        var shigong =  $('.shigong').val(); // 施工人提成
        var id = $('.ngv').data('id');
        if(!shopname || !temp_num || !lingliao || !shigong){
            mui.toast('信息不能为空!')
            return false;
        }else if(lingliao>100 || shigong>100 ||temp_num>100){
            mui.toast('提成不能大于100!')
            return false;
        }else if(lingliao<0 || shigong<0 ||temp_num<0){
            mui.toast('提成不能小于0!')
            return false;
        }
        else{
            var arr = {1:temp_num,2:lingliao,3:shigong}
            console.log(id)
            console.log(arr)
            arr = JSON.stringify(arr);
            $.ajax({
                url:api+'smobileOrderServeGoods',
                type:'post',
                headers:{'sellermobileauthkey':token},
                beforeSend:function(){
                    $('.loading').show();
                },
                data:{
                    goods_name : shopname,
                    is_verify: id,
                    percent_price: arr,
                },
                success:function(data){
                    console.log(data)
                    if(data.result){
                        location.href = './commodity.html'
                    }else{
                        mui.toast('添加失败')
                    }
                }
            })
        }
    })
})