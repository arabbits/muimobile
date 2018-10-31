

$(function(){
    // 选择男女
    // $('.select_man').on('tap',function(){
    //     $(this).find('.iconfont').addClass('che_color').parent().siblings().find('.iconfont').removeClass('che_color');

    // })

    var carObj = sessionStorage.getItem('carObj');
    if(!carObj){
        mui.toast('暂无数据')
    }else{
        // var 参数：user_id,cart_id
        carObj = JSON.parse(carObj);
        console.log(carObj)
        
        var userid = carObj.userid;
        var cartid = carObj.cartid;
        var cart_licens = carObj.cart_licens
        var type = carObj.type;
        console.log(type)
        
        // 获得提醒事项 + 车主信息
        $.ajax({
            url:api+'smobileOrderUserCartDetail',
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
                $('.loading').show();
                $('.che_main').hide();
                $(".che_footer").hide();
            },
            data:{
                user_id : userid,
                cart_id : cartid,
            },
            // headers:{"userauthkey":token},
            success:function(data){
                console.log(data);
                if(data.result){
                    if(data.data.length==0){
                        mui.toast('暂无数据')
                    }else{
                        $('.reception_navs').html(template('tpl',data));
                        
                        $.ajax({
                            url:api+'smobileExpireRemind',
                            type:'post',
                            headers:{'sellermobileauthkey':token},
                            data:{
                                user_id : userid,
                                cart_id : cartid,
                                
                            },
                            success:function(res){
                                console.log(res);
                                $('.loading').hide();
                                
                                if(res.result){
                                    $('.reception_main').html(template('tpls',res));
                                    $('.che_main').show();
                                    $(".che_footer").show();
                                    
                                    if(res.data.length>0){
                                        $('.reception_main').show();
                                    }
                                    
                                }else{
                                    mui.toast('暂无数据')
                                }
                                 
                            }
                        })
                    }
                }else{
                    mui.toast(data.msg)
                }
            },
        })
        // 获得卡券列表
        $.ajax({
            url:api+'smobileSelectCardUser',
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
                $('.loading').show();
                $('.che_main').hide();
            },
            data:{
                cart_licens : cart_licens,
                store_id : store_id,
            },
            success:function(data){
                console.log(data)
                if(data.result){
                    $('.couponList').html(template('tplcoupon',data))
                    if(data.data[0].cardList.length>0){
                        $('.kouka').show();
                        $('.coupon_All').show();
                        $('.che_footer').find('.footer_kou').addClass('over_footer');
                    }
                }else{
                    mui.toast(data.msg)
                }
            }
        })
        // 获得验车单信息
        $.ajax({
            url:api+'smobileListStoreVerify',
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
                $('.loading').show();
                $('.che_main').hide();
            },
            data:{
                cart_id : cartid,
                store_id : store_id,
            },
            success:function(data){
                console.log(data)
                // $('.loading').hide();
                // $('.che_main').show();
                if(data.result){
                    $('.validate_All').html(template('validate',data))
                    // if(data.data[0].cardList.length>0){
                        // $('.kouka').show();
                        // $('.coupon_All').show();
                    // }
                }else{
                    mui.toast(data.msg)
                }
                if(data.code==1001){
                    location.href = "/login.html"
                }
            }
        })
        $('.icon_left').on('tap',function(){
            if(type==1){
                location.href = "./automate.html"
            }else if(type==2){
                location.href = "./manual.html"
            }else if(type==3){
                history.go(-1);
            }

        })
        // 操作验车单数据 加上 select类是为了区别验车单是否被选中;
        $('.che_main').on('tap','.val_bgc',function(){
            $(this).removeClass('val_bgc').addClass("select").siblings().addClass('val_bgc').removeClass("select");
            console.log($(this).data('id'));
        })

        // 将接单改成入店
        $('.rudian').on('tap',function(){
            var carName = $('.carName').text();
            var nav_iphone = $('.nav_iphone').text();
            if(!carName){
                mui.toast('车牌不能为空')
            }else{
                $.ajax({
                    url:api+'smobileAddStoreOwner',
                    type:'post',
                    headers:{'sellermobileauthkey':token},
                    data:{
                        store_id: store_id,
                        cart_licens:carName,
                    },
                    success:function(data){
                        console.log(data);
                        if(data.result){
                            mui.toast(data.msg)
                            setTimeout(function () {
                                location.href = "../index.html";
                            },500)
                        }else{
                            mui.toast(data.msg)
                        }
                         
                    }
                }); 
            }                
        })
        $('.jiedan').on('tap',function(){
            var carName = $('.carName').text();
            var carMan = $('.carMan').text();
            var nav_iphone = $('.nav_iphone').text();
            carObj.carName = carName;
            carObj.carMan = carMan;
            carObj.nav_iphone = nav_iphone;
            sessionStorage.setItem('carObj',JSON.stringify(carObj));
            var num_vali = $(".select").length;
            var validate = [];
            //  var validate = {verify:[]};
            if(num_vali>0){
                $(".select").each(function(v,i){
                    console.log(v);
                    var that = $(this);
                    var gradeId = that.data('id');   //  故障级别
                    var goods_id = that.parents('.validate').data('id');  // 项目id
                    var goods_name = that.parents('.validate').find('.val_name').text(); // 检查项目名字
                    var dispose_way = that.parents('.validate').find('#textarea').val(); // 处理方法
                    var remark = that.parents('.validate').find('#remark').val();         //  备注
                    var vali_obj = {goods_id:goods_id,grade:gradeId,goods_name:goods_name,dispose_way:dispose_way,remark:remark};
                    // validate.verify.push(vali_obj)
                    validate.push(vali_obj)
                })
            }
            console.log(validate);
            localStorage.setItem("validate",JSON.stringify(validate));
            sessionStorage.removeItem('goodsSeller')
            sessionStorage.removeItem('goodsList')
            sessionStorage.removeItem('commObj')
            sessionStorage.removeItem('linshiArr')
            sessionStorage.removeItem('pageArray')
            sessionStorage.removeItem('entityArray')
            sessionStorage.removeItem('entityObjs')
            location.href = "./billing.html"
        })
        //扣卡
        $('.kouka').on('tap',function(){
            var num_vali = $(".select").length;
            
            var koukaVali = [];
            //  var validate = {verify:[]};
            if(num_vali>0){
                $(".select").each(function(v,i){
                    console.log(v);
                    var that = $(this);
                    var gradeId = that.data('id');   //  故障级别
                    var goods_id = that.parents('.validate').data('id');  // 项目id
                    var goods_name = that.parents('.validate').find('.val_name').text(); // 检查项目名字
                    var dispose_way = that.parents('.validate').find('#textarea').val(); // 处理方法
                    var remark = that.parents('.validate').find('#remark').val();         //  备注
                    var example_id = that.parents('.validate').data('temp');
                    var vali_obj = {goods_id:goods_id,grade:gradeId,goods_name:goods_name,dispose_way:dispose_way,remark:remark,example_id:example_id};
                    // validate.verify.push(vali_obj)
                    koukaVali.push(vali_obj)
                })
            }
            console.log(koukaVali);
            localStorage.setItem("koukaVali",JSON.stringify(koukaVali));
            
            sessionStorage.removeItem('couponEntity')
            sessionStorage.removeItem('GoodsList')
            sessionStorage.removeItem('couponLingshi')
            sessionStorage.removeItem('couponId')
            sessionStorage.removeItem('shitID')

            location.href = "./couponList.html"
        })

    }

})