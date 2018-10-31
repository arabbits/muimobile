$(function(){
    $.ajax({
        url:api+"smobileTree",
        type:"get",
        headers:{"sellermobileauthkey":token},
        beforeSend:function(){
            $('.loading').show()
        },
        success:function(data){
            $('.loading').hide();
            console.log(data);
            console.log(data.data[1]);
            if(data.result){
                $('.allSuper').show()
                $('.allSuper').html(template('tpl',data.data[1]))
            }
            if(data.code ==1001){
                mui.alert(data.error,function(){
                    localStorage.removeItem('userObj');
                    location.href="/login.html"
                })
            }
        }
    })
    $('.portraitName').text(name); //添加用户名
    $('body').on('tap','.footer_mains',function(){
        console.log('解决')
        $(this).addClass('che_color').siblings().removeClass('che_color');
        var shitid = $(this).data('id');
        // var data;
        if(shitid == 1){
            location.href="./index.html"
            
        }else if(shitid ==2 ){
            location.href="./faxian.html"
        }
        
    })

    $('.allSuper').on('tap','.cheSuper',function(){
        var id = $(this).data('id');
        if(id ==1){
            console.log(id);
            location.href = "./find/commission.html"
        }else if(id ==2){
            location.href = "./find/breakdown.html"
        }else if(id ==3 ){
            location.href="./find/warning.html"
        }
    })
    $('.noflex').on('tap',function(){
        console.log('jj')
        // location.href = './index/billing.html' 开单
        location.href = './index/pickSingle.html'
    })
})