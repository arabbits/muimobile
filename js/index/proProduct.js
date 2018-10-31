$(function(){
    var pay_id = sessionStorage.getItem('pay_id');
    var all_moneys,couponMoney,puyer_money;
    if(pay_id){
        $.ajax({
            url:api+"smobileOrderDeatils",
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
                $('.loading').show()
            },
            data:{order_id:pay_id},
            success:function(data){
                console.log(data);
                $('.loading').hide()
                $('.che_main').show()
                var user_id = data.data.user_id;
                all_moneys = data.data.totalprice;
                vipObj(user_id);
                coupons(user_id,all_moneys);
                if(data.result){
                    $('.tosuit_main').html(template('tpl',data));
                }else{
                    mui.toast(data.msg)
                    
                }
            }
        })
        //会员卡接口 
        function vipObj(user_id){
            $.ajax({
                url:api+"smobileGetUserClubCard",
                type:'post',
                headers:{'sellermobileauthkey':token},
                beforeSend:function(){
                    // $('.loading').show()
                },
                data:{user_id:user_id},
                success:function(data){
                    console.log(data);
                    console.log(data.data.length);
                    if(data.result){
                        $('.tosuit_main .payVip_name').html(template('tpls',data))
                    }
                    // $('.loading').hide()
                    // $('.che_main').show()
                    // if(data.result){
                    //     $('.tosuit_main').html(template('tpl',data))
                    // }else{
                    //     mui.toast(data.msg)
                        
                    // }
                }
            })

        }
        // is_usable可不可用
        // 抵用券接口
        function coupons(user_id,all_moneys){
            $.ajax({
                url:api+"smobileListAllRecommend",
                type:'post',
                headers:{'sellermobileauthkey':token},
                // beforeSend:function(){
                // },
                data:{
                    user_id:user_id,
                    order_price:all_moneys ,   // 订单总价
                },
                success:function(data){
                    console.log(data);
                    if(data.result){
                        
                        $(".tosuit_main .coupon_list").html(template('couponTpl',data))
                    }
                }
            })

        }
        // 点击选择优惠方式
        $('.che_main').on('tap','.coupon_this',function(){
            var that = $(this);
            var id = that.data('id');
            that.find('.iconfont').addClass('coupon_color').parent().siblings().find('.iconfont').removeClass('coupon_color');
            if(id=="a"){
                $('#pay_youhui').show();
                $('.coupon_list').hide();
                $('.ems').text(all_moneys);
                $('#pay_today').val(all_moneys);
                $('.coupon_one').each(function(v,i){
                    $(this).find('.iconfont').removeClass('thisColor');
                })
                
            }else if(id=="b"){
                $('.coupon_list').show();
                $('#pay_youhui').val('').hide();
                $('.ems').text(all_moneys);
            }
        })
        //  当选择抵用券时  抵消实际支付金额
        $('.che_main').on('tap','.coupon_one',function(){
            var that = $(this);
            var id = that.data('couponprice')*1;
            var thisMoney = $('.ems').text()*1;
            if(!that.find('.iconfont').hasClass('thisColor')){
                $('.ems').text(thisMoney-id);
                $('#pay_today').val(thisMoney-id);
            }
            that.find('.iconfont').addClass('thisColor').parent().siblings().find('.iconfont').removeClass('thisColor');


            
        })


        // 输入优惠时的价格展示
        $(".che_main").on("input",'#pay_youhui',function(){
            var num = $(this).val();
            console.log(num)
            $('#pay_buy').val('0');
            // var money = $('.ems').text();
            // console.log(money - num)
            var he = all_moneys - num;
            var nowMoney = $('.ems').text();
            var idsss = $('.pay_color').parent().data('id');
            console.log(he)
            // 判断是否为会员卡
            if(idsss==8){
                console.log(couponMoney);
                // 判断是否点击卡券
                if(couponMoney){
                    var xixi = couponMoney-num;
                    if(xixi<0){
                        mui.toast('优惠不能大于'+couponMoney);
                        $(this).val(couponMoney);
                        $('.ems').text('0');
                        $("#pay_today").val('0')
                    }else{
                        $('.ems').text(xixi.toFixed(2));
                        $("#pay_today").val(xixi.toFixed(2));
                        
                    }
                }else{
                    if(he<0){
                        mui.toast('优惠不能大于'+all_moneys);
                        $(this).val(all_moneys);
                        $('.ems').text('0');
                        $("#pay_today").val('0')
                    }else{
                        $('.ems').text(he);
                        $("#pay_today").val(he)
                    }

                }
            }else{
                if(he<0){
                    mui.toast('优惠不能大于'+all_moneys);
                    $(this).val(all_moneys);
                    $('.ems').text('0');
                    $("#pay_today").val('0')
                }else{
                    $('.ems').text(he);
                    $("#pay_today").val(he)
                }
            }
        })

        // 挂账变化input 
        $('.che_main').on("input","#pay_buy",function(){
            var thisText = $(this).val();
            var youhuiMoney = $('.ems').text();
            var guazhang = youhuiMoney*1-thisText*1;
            var pay_today = $("#pay_today").val();
            console.log(guazhang)
            if(guazhang*1<0){
                $(this).val(youhuiMoney);
                $("#pay_today").val('0');
            }else{
                $("#pay_today").val(Math.abs(guazhang));
            }
        })
        //挂账支付方式
        $('.che_main').on('tap',".buy_one",function(){
            var that = $(this);
            console.log();
            that.find('.iconfont').addClass('buyer_color').parent().siblings().find('.iconfont').removeClass('buyer_color');
        })


        // 点击会员卡可以去掉钱
        $('.che_main').on('tap','.cli_pay',function(){
            console.log('呵呵')

            console.log(all_moneys)
            // 拿到会员卡金额 与折扣
            var data_money = $(this).data('money') // 会员余额
            var data_vip = $(this).data('yes'); //折扣
            $('.koukaMoney').text((all_moneys*data_vip).toFixed(2));
            var all_data = data_money - all_moneys*data_vip;
            console.log(all_data)
            all_data = all_data.toFixed(2);
            $('.vipMoney').text(all_data);
            if(all_data<0){
                $('.tixing').show();
                mui.toast('该会员卡不能使用!')
                $('.ems').text(all_moneys)
                
            }else{
                $('.tixing').hide();
                $('.ems').text((all_moneys*data_vip).toFixed(2));
                couponMoney=(all_moneys*data_vip).toFixed(2);
            }
            $(this).find('.iconfont').addClass('cliPays').parent().siblings().find('.iconfont').removeClass('cliPays');
            
        })

        // 点击选择选择方式
        $('.che_main').on('tap',".payStyle",function(){
            var that = $(this);
            var id = that.data('id');
            $('#pay_youhui').val('');
            that.find('.iconfont').addClass('pay_color').parent().siblings().find('.iconfont').removeClass('pay_color');
            
            if(id==8){
                $('.fuck_pay').show();
                $('.coupon').hide();  // 隐藏优惠
            }else{
                $('.fuck_pay').hide();
                $('.payVip_name').find('.iconfont').removeClass('cliPays'); //  清空选择的会员卡
                $('.ems').text(all_moneys)
                $('.vipMoney').text('');
                $('.koukaMoney').text('');
                $('.coupon').show();  // 显示优惠
                $('.tixing').hide();
                $('#pay_youhui').show(); // 显示优惠方式
                $('.coupon_list').hide();
                $('.kkks').find('.iconfont').addClass('coupon_color').parent().siblings().find('.iconfont').removeClass('coupon_color');
                $('.coupon_one').each(function(v,i){
                    $(this).find('.iconfont').removeClass('thisColor');
                })
            }
            if(id == 7){
                $('.qita').css('display',"flex")
            }else{
                $('.qita').hide();
                $('.qitaConter').val(''); // 清空其他备注的值
            }
            if(id ==5){
                console.log('挂账');
                $('.buyers').show();
                $('#pay_today').val(all_moneys);
            }else{
                $('.buyers').hide();
            }
    
        })

        function tijiao(pay_id,pay_type,other,club_id,real_price,discount,remark,now_pay,arrears,pay_types,rec_id){
            $.ajax({
                url:api+"smobileOrderStatus",
                type:'post',
                headers:{'sellermobileauthkey':token},
                beforeSend:function(){
                    $('.loading').show()
                },
                data:{
                    order_id:pay_id,
                    pay_type:pay_type,
                    other:other,
                    club_id:club_id,
                    real_price:real_price,
                    discount:discount,
                    remark:remark,
                    now_pay:now_pay,
                    arrears:arrears,
                    pay_types:pay_types,
                    rec_id:rec_id
                },
                success:function(data){
                    console.log(data);
                    $('.loading').hide()
                    if(data.result){
                        sessionStorage.removeItem("pay_id");
                        location.href="./pay.html"
                    }else{
                        mui.toast(data.msg)
                    }
                }
            })

        }
        //点击提交
        $('.che_main').on('tap','.fuckyou',function(){
            var order_id ,other ,club_id,real_price,discount ,remark,now_pay,arrears,pay_types,rec_id; 
            now_pay='';
            arrears='';
            pay_types='';
            club_id = '';
            var pay_type = $('.pay_color').parent().data('id'); // 支付方式 8是会员 5是挂账
            real_price =$('.ems').text(); //提交实际价格
            discount = all_moneys - real_price; //提交时的优惠价格
            remark = $('#remark').val();
            var ggsmd = $('.qitaConter').val();
            ggsmd == ''?other='':other=ggsmd;
            // console.log(other)
            
            // 拿到会员的id
            var haveCoupon = $('.coupon_color').parent().data('id'); // 是否用抵用券抵扣
            var lengCoupon = $('.thisColor').length   // 是否用抵用券
            
            if(haveCoupon=='b' && lengCoupon!=1){
                mui.toast('请选择抵用券');
                return false;
            }else if(haveCoupon=='b'&& lengCoupon>0){
                rec_id = $('.thisColor').data('couponid');
                console.log(rec_id)
            }
            if(pay_type==8){
                console.log('刚刚')
                if($('.payVip_name').find(".cliPays").length>0){
                    club_id = $('.cliPays').parent().data('id');
                    if($('.vipMoney').text()<0){
                        mui.toast('会员卡余额不足');
                        return false;
                    }else{
                        tijiao(pay_id,pay_type,other,club_id,real_price,discount,remark,now_pay,arrears,pay_types,rec_id);
                    }
                }else{
                    mui.toast('请选择会员卡');
                }
            }else if(pay_type==5){
                now_pay = $('#pay_buy').val();
                arrears = $('#pay_today').val();
                pay_types = $('.buyer_color').parent().data('buyid');
                tijiao(pay_id,pay_type,other,club_id,real_price,discount,remark,now_pay,arrears,pay_types,rec_id)
            }else{
                console.log('jj')
                console.log(haveCoupon)
                console.log(lengCoupon)
                tijiao(pay_id,pay_type,other,club_id,real_price,discount,remark,now_pay,arrears,pay_types,rec_id)
            }
            // if(pay_type==8){
            //     // console.log($('.payVip_name').find(".cliPays").length>0)
            //     if($('.payVip_name').find(".cliPays").length>0){
            //         club_id = $('.cliPays').parent().data('id');
            //     }else{
            //         mui.toast('请选择会员卡');
            //         return false;    
            //     }
            // }else{
            //     club_id='';
            // }
            // if(pay_type==5){
            //     now_pay = $('#pay_buy').val();
            //     arrears = $('#pay_today').val();
            //     pay_types = $('.buyer_color').parent().data('buyid');
            // }

            
            
            // else{
            //     console.log(club_id+'个'+pay_type)
            //     console.log(discount+'个'+real_price)
            //     console.log(now_pay);
            //     console.log(arrears);
            //     console.log(pay_types);
            //     console.log(haveCoupon);
            //     console.log(lengCoupon);
                
                // $.ajax({
                //     url:api+"smobileOrderStatus",
                //     type:'post',
                //     headers:{'sellermobileauthkey':token},
                //     beforeSend:function(){
                //         $('.loading').show()
                //     },
                //     data:{
                //         order_id:pay_id,
                //         pay_type:pay_type,
                //         other:other,
                //         club_id:club_id,
                //         real_price:real_price,
                //         discount:discount,
                //         remark:remark,
                //         now_pay:now_pay,
                //         arrears:arrears,
                //         pay_types:pay_types

                //     },
                //     success:function(data){
                //         console.log(data);
                //         $('.loading').hide()
                        
                //         if(data.result){
                //             sessionStorage.removeItem("pay_id");
                //             // location.href="./pay.html"
                //         }else{
                //             mui.toast(data.msg)
                //         }
                //     }
                // })
            // }

        })
    }else{
        // mui.alert('登录有误');
        location.href='./pay.html'
    }
})