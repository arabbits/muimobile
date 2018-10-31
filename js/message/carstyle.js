$(function(){
    var cheText = sessionStorage.getItem('test');
    var id = sessionStorage.getItem('ID');
    var where = sessionStorage.getItem('where');
    var type_id = 4;
    console.log(id)
    console.log(cheText)
    //渲染列表
    $.ajax({
        url:api+"smobileSearchCar",
        type:'post',
        headers:{'sellermobileauthkey':token},
        beforeSend:function(){
            $('.loading').show()
        },
        data:{id:id,type_id:type_id},
        success:function(info){
            if(info.result){
                $('.loading').hide()
                $('.che_main').show()
                
                console.log(info)
                $('.zu_main').html(template('tpl',info))
                $('.contain .zu_main').on('tap','.zuli',function(){
                    // var that = $(this);
                    var text =  $(this).text();
                    var id = $(this).data('id');
                console.log(id)
                // var partext = $(this).parents('.contain').find('.zu_Name').text()
                    var all = cheText+text;
                    var cart_licens = {All:all,type_id:id};
                    sessionStorage.setItem("cart_licens",JSON.stringify(cart_licens));
                    sessionStorage.removeItem('ID')
                    sessionStorage.removeItem('test')
                    // history.go(-2);
                        location.href = '../addNewcar.html';
                })
            }else{
                mui.toast(info.msg);
            }
           

        }
    })

})