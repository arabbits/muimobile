
$(function(){
    var seller_ID = sessionStorage.getItem('seller_ID');
    if(seller_ID){
        seller_ID = JSON.parse(seller_ID);
        var id = seller_ID.id;
        var name = seller_ID.name;
        $('.fontsWei').text(name);
        $.ajax({
            url:api+'smobileHistoryBalance',
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
              $('.loading').show()
            },
            data:{
                seller_id:id
            },
            success:function(data){
                $('.loading').hide();
                console.log(data)
                if(data.result){
                    $('.che_main').show();
                    $('.father').html(template('tpls',data))
                }else{
                    mui.toast(data.msg);
                    $('.volist').show();
                }
            }
        });

        $('.father').on('tap','.main_pro',function(){
            var proId = $(this).data('id');
            seller_ID.proId = proId;
            
            console.log(seller_ID);
            sessionStorage.setItem('seller_ID',JSON.stringify(seller_ID));
            location.href="./historyProduct.html"
        })
        
    }else{

    }
})