

$(function(){
    var carlistObj = sessionStorage.getItem('carlistObj');
    if(!carlistObj){
        mui.alert('您未登录',function(){
            location.href = "/login.html"
        })
    }else{
        carlistObj = JSON.parse(carlistObj);
        var carID,carText,newTime;
        carID = carlistObj.id;
        carText = carlistObj .text;
        newTime = carlistObj.newTime;
        $('h4').text(carText);
        console.log(carlistObj);
        carlist(carID,newTime);
        function carlist(carID,newTime){
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
                    $('.che_main').show()
                    if(data.result){
                        $('.tosuit_main').html(template('tpls',data))
                        if(carID==1){
                            $('.over').hide();
                            $('.addProduct').show();
                            
                        }
                        if(data.data.length==0){
                            $('.volist').show();
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
        // if(carID!=1){
        //     $('.che_main').on('tap','.overFlow',function(){
        //         var order_id = $(this).parents('.tosuit_top').data('id');
        //         console.log(order_id);
        //         $.ajax({
        //             url:api+"smobileSureComplete",
        //             type:'post',
        //             headers:{'sellermobileauthkey':token},
        //             beforeSend:function(){
        //                 $('.loading').show()
        //             },
        //             data:{order_id:order_id,type:carID},
        //             success:function(data){
        //                 console.log(data);
        //                 $('.loading').hide()
        //                 if(data.result){
        //                     var carlistObj = sessionStorage.removeItem('carlistObj');
        //                     location.href = "/index.html";
        //                 }
        //             }
        //         })
        //         // location.href="./carProduct.html";
        //     })
        // }
        if(carID!=1){        
            $('.che_main').on('tap','.tosuit_top',function(){
                var order_id = $(this).data('id');
                var status = $(this).data('status');
                var click = 0;
                if($(this).find(".over").length>0){
                    click = 1;
                }
                carlistObj.carlist_id = order_id;
                carlistObj.status = status;
                carlistObj.click = click;
                // console.log(order_id);
                // sessionStorage.setItem('carlist_id',order_id)
                sessionStorage.setItem('carlistObj',JSON.stringify(carlistObj));
                location.href="./carProduct.html";
            })
        }else{        
            $('.che_main').on('tap','.addType',function(){
                var idshit = $(this).data('id');
                $.ajax({
                    url:api+"smobileEditOrder",
                    type:'post',
                    headers:{'sellermobileauthkey':token},
                    beforeSend:function(){
                        $('.loading').show()
                    },
                    data:{order_id:idshit},
                    success:function(data){
                        console.log(data);
                        $('.loading').hide();
                        if(!!data.result){
                            sessionStorage.setItem('addProductList',JSON.stringify(data));
                            sessionStorage.removeItem('delGoods');
                            sessionStorage.removeItem('addObjGood');
                            sessionStorage.removeItem('validate');

                            location.href="./addProduct/addproduct.html";
                            
                        }
                    }
                });
                
            })

        }
        // }
        // 将手机返回键改成跳转
        pushHistory(); 
        window.addEventListener('popstate', function(e) { 
            window.location = '../index.html' 
        }, false); 
        function pushHistory() { 
            var state = { 
                title: 'title', 
                url: '#' 
            }; 
            window.history.pushState(state, 'title', '#'); 
        } 


        
    }
})