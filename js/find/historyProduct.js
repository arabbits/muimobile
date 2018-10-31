$(function(){
    var seller_ID = sessionStorage.getItem('seller_ID');
    console.log(seller_ID)
    
    if(seller_ID){
        seller_ID = JSON.parse(seller_ID);
        var id = seller_ID.proId;
        var name = seller_ID.name
        // $('.fontsWei').text(name);
        $.ajax({
            url:api+'smobileBalanceOrderList',
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
              $('.loading').show()
            },
            data:{
                id:id
            },
            success:function(data){
                $('.loading').hide();
                console.log(data)
                if(data.result){
                    $('.che_main').show();
                    $('#item1mobile').html(template('allOrder',data));
                    $('.store_name').each(function(v,i){
                        $(this).text(name)
                    })
                    
                }else{
                    mui.toast(data.msg);
                    $('.volist').show();
                }
            }
        });
    }else{

    }
})