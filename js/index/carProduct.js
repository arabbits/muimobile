



$(function(){
    var carlistObj = sessionStorage.getItem('carlistObj');
    
    if(carlistObj){
        carlistObj = JSON.parse(carlistObj);
        console.log(carlistObj);
        var status = carlistObj.status;
        var click = carlistObj.click;
        var text = carlistObj.text;
        var order_id = carlistObj.carlist_id;
        var type = carlistObj.id;
        $('h4').text(text+'详情');
        $.ajax({
            url:api+"smobileOrderDeatils",
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
                $('.loading').show()
            },
            data:{order_id:order_id,type:type},
            success:function(data){
                console.log(data);
                // $.each(data.data,function(v,i){
                //     console.log(i.cartList.cart_licens + v);
    
                // })
                $('.loading').hide()
                $('.che_main').show()
                if(data.result){
                    $('.tosuit_main').html(template('tpl',data));
                    if(type!=1){
                        if(status == 1){
                            $('.tosuit_main').append(`<div class="carOver">
                                                <div class="reception_message"  style="background-color:#ccc">
                                                    已完成
                                                </div>
                                            </div>`);
                        }else if(click==1){
                            $('.tosuit_main').append(`<div class="carOver">
                                                <div class="reception_message bgckColor">
                                                    完成
                                                </div>
                                            </div>`);

                        }
                    }
                }
            }
        });

        $('.tosuit_main').on('tap','.bgckColor',function(){
            $.ajax({
                url:api+"smobileSureComplete",
                type:'post',
                headers:{'sellermobileauthkey':token},
                beforeSend:function(){
                    $('.loading').show();
                },
                data:{order_id:order_id,type:type},
                success:function(data){
                    console.log(data);
                    $('.loading').hide();
                    if(data.result){
                        var carlistObj = sessionStorage.removeItem('carlistObj');
                        location.href = "/index.html";
                    }
                }
            })
        })

    }else{
        mui.alert('您未登录',function(){
            location.href = "/login.html";
        })
    }
})