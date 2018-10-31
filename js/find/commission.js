

$(function(){


    $.ajax({
        url:api+'smobileBalanceList',
        type:'post',
        headers:{'sellermobileauthkey':token},
        beforeSend:function(){
          $('.loading').show()
        },
        success:function(data){
            console.log(data);
            $('.loading').hide();
            $('.che_main').show();
            if(data.result){
                $('.find_header').html(template('tpl',data))
            }else{
                mui.toast(data.msg);
                $('.volist').show();
            }
        }
    })

    $('.find_header').on('tap','.find_main',function(){
        var id = $(this).data('id');
        var name =  $(this).find('.fontsWei').text();

        // var that = $(this);
        // that.find('.mui-icon-forward').toggleClass('salce'); //旋转箭头
        console.log(name)
        var seller_ID = {id:id,name:name}
        sessionStorage.setItem('seller_ID',JSON.stringify(seller_ID))
        location.href = './history.html'
        
        // that.next().toggle(); // 控制历史订单显隐
        // if(that.find('.salce').length>0){
        //     $.ajax({
        //         url:api+'smobileHistoryBalance',
        //         type:'post',
        //         headers:{'sellermobileauthkey':token},
        //         beforeSend:function(){
        //         //   $('.loading').show()
        //         },
        //         data:{
        //             seller_id:id
        //         },
        //         success:function(data){
        //             if(data.result){
        //                 console.log(data)
        //                 that.next().html(template('tpls',data))
        //             }
        //         }
        //     })

        // }
    })
})