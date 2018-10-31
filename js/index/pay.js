

$(function(){
    var carlistObj = sessionStorage.getItem('carlistObj');
    console.log(is_boss);
    if(!carlistObj){
        mui.alert('您未登录',function(){
            location.href = "/login.html"
        })
    }else{
        carlistObj = JSON.parse(carlistObj);
        var carID,carText,newTime;
        carID = carlistObj.id;
        carText = carlistObj .text;
        newTime = carlistObj .newTime; 
        // $('h4').text(carText);
        // console.log(carlistObj);
        carlist(carID);
        function carlist(carID){
            $.ajax({
                url:api+"smobileIndexOrderList",
                type:'post',
                headers:{'sellermobileauthkey':token},
                beforeSend:function(){
                    $('.loading').show()
                },
                data:{type:carID,time:newTime},
                success:function(data){
                    console.log(data);
                    // $.each(data.data,function(v,i){
                    //     console.log(i.cartList.cart_licens + v);
        
                    // })
                    $('.loading').hide()
                    if(data.result){
                        $('.tosuit_main').html(template('tpls',data))
                        if(is_boss==0){
                            $('.over').hide();  
                        }
                        if(data.data.length ==0){
                            $('.volist').show();
                        }else{
                            $('.che_main').show()
                        }
                    }else{
                        mui.toast(data.msg);
                    }
                    if(data.code ==1001){
                        mui.alert('您的登录已失效',function(){
                            localStorage.removeItem('userObj');
                            location.href="/login.html"
                        })
                    }
                }
            })
        }
        $('.che_main').on('tap','.shit',function(){
            var order_id = $(this).parents(".tosuit_top").data('id');
            sessionStorage.setItem('pay_id',order_id)
            location.href="./proProduct.html";
        })
    }
})