

$(function(){
    var options='<option value="-2">请选择</option>' ;

    var carObj = sessionStorage.getItem('carObj');
    if(!carObj){
        mui.toast('暂无数据')
    }else{
        // var 参数：user_id,cart_id
        carObj = JSON.parse(carObj);
        console.log(carObj)
        
        var userid = carObj.userid;
        var cartid = carObj.cartid;
        var cart_licens = carObj.cart_licens;
        // 获得客户信息渲染页面
        // $.ajax({
        //     url:api+'smobileOrderUserCartDetail',
        //     type:'post',
        //     headers:{'sellermobileauthkey':token},
        //     beforeSend:function(){
        //         $('.loading').show();
        //     },
        //     data:{
        //         user_id : userid,
        //         cart_id : cartid,
        //     },
        //     // headers:{"userauthkey":token},
        //     success:function(data){
        //         $('.loading').hide();
        //         console.log(data);
        //         if(data.result){
        //             if(data.data.length==0){
        //                 mui.toast('暂无数据')
        //             }else{
        //                 $('.reception_navs').html(template('tpl',data));
        //             }
        //         }else{
        //             mui.toast(data.msg)
        //         }
        //     },
        // })
        // 获取卡券记录信息

        $.ajax({
            url:api+'smobileGetCouponRecord',
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
                $('.loading').show();
                $('.che_main').hide();
            },
            data:{
                store_id : store_id,
                page:1,
                limit:1000
            },
            // headers:{"userauthkey":token},
            success:function(data){
                $('.che_main').show();
                $('.loading').hide();
                console.log(data);
                if(data.result){
                    $('.record_main').html(template('tplRecord',data))
                }else{
                    mui.toast(data.msg)
                }
            },
        })

        //选完临时商品后渲染到本页面
    }
})