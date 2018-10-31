


$(function(){
    
    //遍历添加数据
    
    $.ajax({
        url:api+'smobileEntityGoodsList',
        type:'post',
        headers:{'sellermobileauthkey':token},
        beforeSend:function(){
            $('.loading').show();
            $('.che_footer').hide();
            $('.che_main').hide();
            
        },
        data:{
            store_id: store_id,
        },
        success:function(data){
            console.log(data);
            if(data.result){
                if(data.data.length<=0){
                    mui.toast('暂无数据')
                }else{
                    $('.mui-scroll').html(template('tpl',data));
                    $('.loading').hide();
                    $('.che_footer').show();
                    $('.che_main').show();
                }
            }else{
                mui.toast('暂无数据')
            }
             
        }
    });   
    
    //选择大项时  清除所有的选中
    $('.mui-scroll').on('tap','.allpitch',function(){
        // $(this).parents('.commodity_main').find('.entity_num').attr('readonly',false)
        $(this).toggleClass('icon-xuanze-').toggleClass('icon-xuanze1').toggleClass('bigColor');
    });

    // 添写商品数量
    // $('.mui-scroll').on('input','.entity_num',function(){
    //     var that = $(this);
    //     var text = that.val();
    //     text = parseInt(text);
    //     var entity_numbers = that.parents('.commodity_one ').find('.type_num').text();
    //     entity_numbers = entity_numbers.split('库存 ')[1];
    //     // console.log(entity_numbers);
    //     // console.log(text);
    //     if(text>entity_numbers){
    //         mui.toast('商品数量不能多于库存');
    //         that.val('');
    //     };
    // });


    //点击添加人

    
    //删除select框
    $('.mui-scroll').on('tap','.icon-guanbi',function(){
        // console.log('呵呵')
        $(this).parent().remove();
    })
    //点击添加
    var couponObj = sessionStorage.getItem('couponEntity');
    var shitID = sessionStorage.getItem('shitID');
    var shitObj = {};
    var linshi = [];
    console.log(shitID)
    if(couponObj){
        couponObj = JSON.parse(couponObj);
        $.each(couponObj,function(v,i){
            linshi.push(v)
        })
        console.log(linshi);
        shitObj = couponObj;
        if(linshi.indexOf(shitID)>-1){
            // mui.toast('去死');
        }else{
            shitObj[shitID] = [];
        }
    }else{
        shitObj[shitID] = [];
    }
    var GoodsList = sessionStorage.getItem('GoodsList');
    if(GoodsList){
        GoodsList = JSON.parse(GoodsList);
    }else{
        GoodsList = [];
    }

    console.log(GoodsList)
    $('.addCommod').on('tap',function(){
        //用来页面之间传值的数组;
        var pageArray ;
        var biglength = $('.bigColor').length;
        if(biglength>0){
            $('.bigColor').each(function(v,i){
                var that = $(this);
                var indexs = v;
                // pageArray[indexs] = {};
                // var pitchOn = that.find('.bigColor').length;
                // if(pitchOn>0){
                    var good_id = that.parents('.commodity_main').data('id'); //保存id
                    console.log(good_id)
                    var type_num = that.parents('.commodity_main').find('.entity_num').val(); //保存数量 
                    var real_price = that.parents('.commodity_main').find('.entity_price').val(); //保存价格
                    var goods_name = that.parents('.commodity_one').find('.comm_name').val(); //保存name 
                    var brand =  that.parents('.commodity_main').find('.comm_brand').val();  // 品牌
                    var model =  that.parents('.commodity_main').find('.comm_model').val();  // 型号
                    var average_price = that.parents('.commodity_header').data('average') ;
                    // console.log(goods_name)
                    if(!type_num){
                        mui.toast('请输入数量')
                        return false;
                    }
                    real_price=real_price.split('￥')[1];
                    // console.log(type_num)
                    //添加对象
                    pageArray={goods_id:good_id,goods_name:goods_name,brand:brand,model:model,apecification:'',unit:'',price:'',orderprice:real_price,type_num:type_num}; 
                    shitObj[shitID].push(pageArray)
                    GoodsObj = {goods_id:good_id,goods_name:goods_name,goods_info:goods_name,shopNum:type_num,coupons_id:shitID,selling_price:real_price,real_price:real_price,average_price:average_price,is_virtual:2};
                    console.log(GoodsObj)
                    
                    GoodsList.push(GoodsObj)
    
            })
            if(!pageArray){
                return false;
            }
            console.log(shitObj[shitID])
            
            console.log(GoodsList)
            sessionStorage.setItem('couponEntity',JSON.stringify(shitObj));  //页面传递的数据
            sessionStorage.setItem('GoodsList',JSON.stringify(GoodsList));  //页面传递的数据
            location.href = '../couponList.html';
                

        }else{
            mui.toast('请选择商品')
        }





        // var nums = $('.picking').find('.commodity_addman').length;
        // var arr = [];
        // if(nums>0){
        //     $('.picking').find('.commodity_addman').each(function(v,i){
        //         var text = $(this).find('#selects').val();
        //         console.log(text)
        //         console.log(v)
        //         arr[v] = text;
        //     })
        //     console.log(arr.distinct())
        // }
        // console.log(nums)
    })
})