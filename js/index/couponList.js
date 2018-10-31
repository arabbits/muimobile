

$(function(){
    var options='<option value="-2">请选择</option>' ;

    var carObj = sessionStorage.getItem('carObj');
    if(!carObj){
        mui.toast('暂无数据')
    }else{
        // var 参数：user_id,cart_id
        carObj = JSON.parse(carObj);
        console.log(carObj)
        
        var userid = carObj.userid;
        var cartid = carObj.cartid;
        var cart_licens = carObj.cart_licens;
        // 获得客户信息渲染页面
        $.ajax({
            url:api+'smobileOrderUserCartDetail',
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
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
                    }
                }else{
                    mui.toast(data.msg)
                }
            },
        })
        // 获取卡券信息
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
                console.log(data);
                $('.loading').hide();
                $('.che_main').show();
                if(data.result){
                    $('.coupon_main').html(template('tplcoupon',data))
                    if(data.data.length>0){
                        if(data.data[0].cardList.length>0){
                            $('.kouka').show();
                            var couponEntity = sessionStorage.getItem('couponEntity');
                            if(couponEntity){
                                couponEntity = JSON.parse(couponEntity);
                                couponEntity = {data:couponEntity};
                                // console.log(couponEntity);
                                // $('.couponEntity').html(template('tplEntity',couponEntity));
                                $.each(couponEntity.data,function(v,i){
                                    // console.log(v)
                                    var haveId = v;
                                    $('.coupon_one').each(function(v,i){
                                        // console.log($(this).data('id'));
                                        var that = $(this);
                                        var iidd = that.data('id');
                                        if(iidd == haveId){
                                            couponEntity.data[iidd] = {shit:couponEntity.data[iidd]}
                                            
                                            that.find('.grandfather').show();
                                            that.find('.allpitch').removeClass('icon-xuanze-').addClass('icon-xuanze1').addClass('che_color');
                                            that.find('.shuru').removeAttr("readOnly").val('1');
                                            that.find('.couponEntity').html(template('tplEntity',couponEntity.data[iidd]));
                                            
                                        }
                                    })
                                })
                                
                            }
                            var linshiArr = sessionStorage.getItem('couponLingshi');
                            if(linshiArr){
                                linshiArr = JSON.parse(linshiArr);
                                linshiArr = {data:linshiArr};
                                $.each(linshiArr.data,function(val,index){
                                    // console.log(val);
                                    var tiaozhuanId = val;
                                    
                                    $('.coupon_main .coupon_one').each(function(v,i){
                                        // console.log($(this).data('id'));
                                        var that = $(this);
                                        var iidd = that.data('id');
                                        if(iidd == tiaozhuanId){
                                            linshiArr.data[iidd] = {shit:linshiArr.data[iidd]}
                                            
                                            that.find('.grandfather').show();
                                            that.find('.shuru').removeAttr("readOnly").val('1');
                                            that.find('.allpitch').removeClass('icon-xuanze-').addClass('icon-xuanze1').addClass('che_color');
                                            that.find('.tableLinshi').html(template('tplLingshi',linshiArr.data[iidd]));
                                            
                                        }
                                    })

                                })
                            }   
                            $.ajax({
                                url:api+'smobileOrderPeopleList',
                                type:'post',
                                headers:{'sellermobileauthkey':token},
                                data:{
                                    store_id: store_id,
                                },
                                success:function(data){
                                    // console.log(data);
                                    if(data.result){
                                        var datasult = data.data;
                                        for(var i=0;i<datasult.length;i++){
                                            options +='<option value="'+datasult[i].seller_id+'">'+datasult[i].seller_account+'</option>';
                                            // console.log(options)
                                        }
                                        // console.log(options);
                                        // 渲染施工人
                                        $('.coupon_main').find('#select').each(function(v,i){
                                            var idthis = $(this).data('id')
                                            if(idthis==1){
                                                $(this).html(`<option value="`+fatherSeller_id+`">`+name+`</option>`)
                                            }else{
                                                $(this).html(options)
                                            }
                                        })
                                    }else{
                                        mui.toast('暂无人员信息')
                                    }
                                }
                            })

                            $.each(couponEntity,function(v,i){
                                // console.log(i)
                            })
                            //是否显示扣卡
                            var couponList = $('.che_color').length;
                            if(couponList>0){
                                $('.kouka').show()
                            }else{
                                $('.kouka').hide()
                                
                            }
                        }
                    }
                }else{
                    mui.toast(data.msg)
                }
            }
        })
        var pageId = sessionStorage.getItem('shitID');

        //选完临时商品后渲染到本页面
        
        //点击选择卡券
        $('.mui-scroll').on('tap','.allpitch',function(){
            $(this).toggleClass('icon-xuanze-').toggleClass('icon-xuanze1').toggleClass('che_color').parents('.coupon_one').find('.grandfather').toggle();
            if($(this).hasClass('icon-xuanze1')){
                $(this).parent().find('.shuru').removeAttr("readOnly").val('1');
            }else{
                $(this).parent().find('.shuru').attr("readOnly",true).val('');
            }
            var couponList = $('.che_color').length;
            //判断是否显示扣卡
            if(couponList>0){
                $('.kouka').show()
            }else{
                $('.kouka').hide()
                
            };
            //渲染施工人员
            // console.log($(this).parents('.coupon_one').find('#select').length)
            
        });

        //删除施工员按钮
        $('.coupon_main').on('tap','.icon-guanbi',function(){
            $(this).parent().remove();
        })
                
        //删除当前商品  coupon_main
        $('.coupon_main').on('tap','.del',function(){
            var linshi = sessionStorage.getItem('couponLingshi');
            var EntityLis = sessionStorage.getItem('couponEntity');
            if(linshi){
                linshi = JSON.parse(linshi);
            }
            if(EntityLis){
                EntityLis = JSON.parse(EntityLis);
            }
            
            
            console.log(linshi);
            var thus = $(this);
            var newArr = []
            var thusId = thus.parents('.coupon_one').data('id');
            var fathers = thus.parents('.couponEntity').length;
            if(fathers>0){
                //删除实体
                var okId = thus.parent().data('id')
                $.each(GoodsList,function(v,i){
                    // console.log(v)
                    if(i.coupons_id==thusId && i.goods_id==okId){
                        var x = thus.parent().find('td').eq(0).text();
                        var y = thus.parent().find('td').eq(1).text();
                        
                        if(x == i.shopNum&& y == i.goods_name){
                            GoodsList.splice(v,1)
                        }
                    }
                    
                })
                $.each(EntityLis,function(v,i){
                    console.log(okId)
                    var x = thus.prev().text();
                    
                    if(v == thusId){
                        $.each(i,function(s,g){
                            
                            var x = thus.parent().find('td').eq(0).text();
                            var y = thus.parent().find('td').eq(1).text();
                            console.log(x)
                            console.log(y)
                            if(g.goods_id == okId&& x == g.type_num&& y == g.goods_name){
                                EntityLis[v].splice(s,1);
                            }
                        })
                    }
                    
                })
                thus.parent().next().remove();
                thus.parent().remove();
            }else{
                // 删除零时
                $.each(GoodsList,function(v,i){
                    // console.log(v)
                    
                    if(i.coupons_id==thusId && i.goods_id==''){
                        var x = thus.prev().text();
                        console.log(x)
                        if(x == i.goods_info){
                            GoodsList.splice(v,1)
                        }
                    }
                    
                })
                //
                $.each(linshi,function(v,i){
                    console.log(v)
                    var x = thus.prev().text();
                    
                    if(v == thusId){
                        $.each(i,function(s,g){
                            console.log(g)
                            if(g.goods_info == x&& g.goods_id==''){
                                linshi[v].splice(s,1);
                            }
                        })

                    }
                    if(i.coupons_id==thusId && i.goods_id==okId){
                        var x = thus.parent().find('td').eq(0).text();
                        var y = thus.parent().find('td').eq(1).text();
                        console.log(x)
                        console.log(i)
                        if(x == i.shopNum&& y == i.goods_name){
                            GoodsList.splice(v,1)
                        }
                    }
                    
                })
                thus.parent().remove();
            
            }
            console.log(linshi)
            console.log(EntityLis)
            sessionStorage.setItem('couponLingshi',JSON.stringify(linshi))
            sessionStorage.setItem('couponEntity',JSON.stringify(EntityLis))
            sessionStorage.setItem('GoodsList',JSON.stringify(GoodsList))
            
        })
        // tableLinshi
        //添加 做判定
        $('.coupon_main').on('tap','.addCoupon',function(){
            var valArr = [];
            $(this).parents('.coupon_oneStyle').find('.commodity_addman').each(function(v,i){
                var valuse = $(this).find('#select').val();
                valArr.push(valuse);
            });
            // console.log(valArr);
            if(valArr.indexOf('-2')>-1){
                mui.toast('请选择工作人员')
            }else{
                $(this).parents('.coupon_oneStyle ').find('.father').append(`<div class="commodity_addman" data-id="1">
                    <span class="iconfont icon-guanbi"></span>
                    <select name="" id="select">
                        `+options+`
                    </select>
                    <span class="iconfont icon-xuanze- shits"></span>
                </div>`)

            }
        })
        //点击跳转临时商品
        var arrCoupon = [];

        var GoodsList = sessionStorage.getItem("GoodsList");
        if(GoodsList){
            GoodsList = JSON.parse(GoodsList);
        }else{
            GoodsList=[];
        }

        $('.coupon_main').on('tap','.temporary',function(){
            //获得che_color的id
            var shitID = $(this).parents('.coupon_one').data('id');

            $('.che_color').each(function(v,i){
                arrCoupon[v] = $(this).parents('.coupon_one').data('id');
            })
            arrCoupon = arrCoupon.distinct();
            // console.log(arrCoupon);
            sessionStorage.setItem('couponId',JSON.stringify(arrCoupon))
            sessionStorage.setItem('shitID',shitID)
            sessionStorage.setItem('GoodsList',JSON.stringify(GoodsList))
            location.href = "./coupon/lingshi.html";

        })
        //点击跳转店内商品
        $('.coupon_main').on('tap','.entity',function(){
            var shitID = $(this).parents('.coupon_one').data('id');
            $('.che_color').each(function(v,i){
                arrCoupon[v] = $(this).parents('.coupon_one').data('id');
            })
            arrCoupon = arrCoupon.distinct();
            console.log(arrCoupon);
            sessionStorage.setItem('couponId',JSON.stringify(arrCoupon))
            sessionStorage.setItem('GoodsList',JSON.stringify(GoodsList))
            sessionStorage.setItem('shitID',shitID)
            location.href = "./coupon/couponEntity.html";

        })
        $('.coupon_main').on('tap','.shits',function(){
            // console.log('kkk');
            // $(this).toggleClass('xixi');
            $(this).toggleClass('icon-xuanze-').toggleClass('icon-xuanze1').toggleClass('xixi');
        })
        //开始扣卡
        $('.kouka').on('tap',function(){
            //遍历每一个卡券  拿到想要的值;
            var lirunPrice =0;
            var cardList = []; //卡券信息
            var goodsSeller = []; //卡券信息
            var cardSeller = [];
            var kkk = [];
            $('.che_color').each(function(v,i){
                var that = $(this);
                var moneyPrice = that.parent().parent().data('lirun');
                var card_id = that.parent().data('id');
                var coupons_id = that.parent().parent().data('id');
                var use_num = that.prev().find('.shuru').val();
                lirunPrice+=use_num*moneyPrice;
                cardList.push({card_id:card_id,coupons_id:coupons_id,use_num:use_num})
                // console.log(card_id+''+coupons_id+''+use_num)
                that.parents('.coupon_one').find('.coupon_oneStyle').each(function(v,i){
                    var ids = $(this).data('id');
                    console.log(ids)
                    if(ids == 1){
                        $(this).find('#select').each(function(v,i){
                            var indexVal = $(this).val();
                            var is_money = '0';
                            var xxx = $(this).next()
                            if(xxx.hasClass('xixi')){
                                is_money="1"
                            }
                            if(indexVal!='-2'){
                                cardSeller.push({type:ids,seller_id:indexVal,card_id:card_id,is_money:is_money})
                            }
                        })
                    }
                    if(ids == 2){
                        $(this).find('#select').each(function(v,i){
                            var indexVal = $(this).val();
                            var is_money = '0';
                            var xxx = $(this).next()
                            if(xxx.hasClass('xixi')){
                                is_money="1"
                            }
                            if(indexVal!='-2'){
                                cardSeller.push({type:ids,seller_id:indexVal,card_id:card_id,is_money:is_money})
                            }
                        })
                    }
                    if(ids == 3){
                        $(this).find('#select').each(function(v,i){
                            var indexVal = $(this).val();
                            var is_money = '0';
                            var xxx = $(this).next()
                            if(xxx.hasClass('xixi')){
                                is_money="1"
                            }
                            if(indexVal!='-2'){
                                cardSeller.push({type:ids,seller_id:indexVal,card_id:card_id,is_money:is_money})
                            }
                        })
                    }
                    if(ids == 4){
                        var goods_id = $(this).parent().data('id');
                        $(this).find('#select').each(function(v,i){
                            var indexVal = $(this).val();
                            var is_money = '0';
                            var xxx = $(this).next()
                            if(xxx.hasClass('xixi')){
                                is_money="1"
                            }
                            if(indexVal!='-2'){
                                goodsSeller.push({type:1,seller_id:indexVal,goods_id:goods_id,is_money:is_money})
                            }
                        })
                    }
                    if(ids == 5){
                        var goods_id = $(this).parent().data('id');
                        $(this).find('#select').each(function(v,i){
                            var indexVal = $(this).val();
                            var is_money = '0';
                            var xxx = $(this).next()
                            if(xxx.hasClass('xixi')){
                                is_money="1"
                            }
                            if(indexVal!='-2'){
                                goodsSeller.push({type:2,seller_id:indexVal,goods_id:goods_id,is_money:is_money})
                            }
                        })
                    }
                    if(ids == 6){
                        var goods_id = $(this).parent().data('id');
                        $(this).find('#select').each(function(v,i){
                            var indexVal = $(this).val();
                            var is_money = '0';
                            var xxx = $(this).next()
                            if(xxx.hasClass('xixi')){
                                is_money="1"
                            }
                            if(indexVal!='-2'){
                                goodsSeller.push({type:3,seller_id:indexVal,goods_id:goods_id,is_money:is_money})
                            }
                        })
                    }

                })
                $.each(GoodsList,function(q,p){
                    console.log(p);
                    if(coupons_id == p.coupons_id){
                        kkk.push(p)  
                    }
                })

            })
            // console.log(GoodsList)
            console.log(cardSeller)
            console.log(goodsSeller)
            kkk = JSON.stringify(kkk);
            goodsSeller = JSON.stringify(goodsSeller);
            cardList = JSON.stringify(cardList);
            cardSeller = JSON.stringify(cardSeller);
            var verifyList = localStorage.getItem('koukaVali');
            
            $.ajax({
                url:api+'smobileOrderUseCard',
                type:'post',
                headers:{'sellermobileauthkey':token},
                beforeSend:function(){
                    $('.loading').show()
                },
                data:{
                    cart_id:cartid,
                    store_id:store_id,
                    user_id:userid,
                    goodsList:kkk,
                    goodsSeller:goodsSeller,
                    cardList:cardList,
                    cardSeller:cardSeller,
                    verifyList:verifyList,
                    card_profit_price:lirunPrice
                },
                success:function(data){
                    console.log(data)
                    $('.loading').hide()
                    
                    if(data.result){
                        mui.toast(data.msg)
                        sessionStorage.removeItem('couponEntity')
                        sessionStorage.removeItem('GoodsList')
                        sessionStorage.removeItem('couponLingshi')
                        sessionStorage.removeItem('couponId')
                        sessionStorage.removeItem('shitID')
                        localStorage.removeItem('koukaVali')
                        location.href ="./couponRecord.html" 
                    }else{
                        mui.toast(data.msg)
                    }
                }
            })

            // console.log(cardList)
            // console.log(goodsSeller)
        })

    }
})