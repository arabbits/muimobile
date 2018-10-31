$(function(){
    
    $.ajax({
        url:api+"smobileGetTodayCartInfo",
        type:"post",
        headers:{"sellermobileauthkey":token},
        beforeSend:function(){
            $('.loading').show()
        },
        data:{
            page:1,
            limit:10
        },
        success:function(data){
            $('.loading').hide();
            if(data.result){
                $('.che_main').show()
                $('.tosuit_main').html(template('tpls',data))
            }else{
                mui.toast(data.msg)
                $('.volist').show()
            }
        }
    })
    $('.tosuit_main').on('tap','.tosuit_top',function(){
        var id = $(this).data('id')
        console.log(id)
        sessionStorage.setItem('allCar_id',id);
        location.href="./thisProduct.html"
    })  

})