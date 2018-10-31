


$(function(){
    
    //遍历添加数据
    var options='<option value="-2">请选择</option>' ;
    
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
                    $.ajax({
                        url:api+'smobileOrderPeopleList',
                        type:'post',
                        headers:{'sellermobileauthkey':token},
                        data:{
                            store_id: store_id,
                        },
                        success:function(data){
                            console.log(data);
                            $('.che_footer').show();
                            $('.loading').hide();
                            $('.che_main').show();
                            
                            if(data.result){
                                var datashut = data.data;
                                console.log(datashut);
                                for(var i=0;i<datashut.length;i++){
                                    options +='<option value="'+datashut[i].seller_id+'" data-id="'+datashut[i].seller_id+'">'+datashut[i].seller_account+'</option>';
                                }
                                var optionshit;
                                function chongfu(datashut,d){
                                    optionshit='<option value="-2">请选择</option>';
                                    for(var i=0;i<datashut.length;i++){
                                        datashut[i].seller_account ==d?optionshit+='<option value="'+datashut[i].seller_id+'" selected>'+datashut[i].seller_account+'</option>':optionshit +='<option value="'+datashut[i].seller_id+'">'+datashut[i].seller_account+'</option>';
                                    }
                                }
                                //如果有值则展示
                                var commObjShit = sessionStorage.getItem('pageArray');
                                if(commObjShit){
                                    commObjShit = JSON.parse(commObjShit);
                                    console.log(commObjShit)
                                    $.each(commObjShit,function(v,i){
                                        console.log(i)
                                        var that = i;
                                        var id = that.goods_id;
                                        var ones = that.kaidan;
                                        var twos = that.lingliao;
                                        var threes = that.shigong;
                                        $('.mui-scroll .commodity_main').each(function(index,val){
                                            var thatsthis = $(this);
                                            var foodid = thatsthis.data('id');
                                            if(id ==foodid){
                                                thatsthis.find('.allpitch').toggleClass('icon-xuanze-').toggleClass('icon-xuanze1').toggleClass('bigColor').parents('.commodity_main').find('.commodity_aside').toggle();
                                                thatsthis.find('.entity_num').val(that.type_num);
                                                if(that.brand!=""){
                                                    thatsthis.find('.icon-xuanze').eq(0).addClass('che_color')
                                                }
                                                if(that.model!=""){
                                                    thatsthis.find('.icon-xuanze').eq(1).addClass('che_color')
                                                }
                                                if(that.apecification!=""){
                                                    thatsthis.find('.icon-xuanze').eq(2).addClass('che_color')
                                                }
                                                if(that.price!=""){
                                                    thatsthis.find('.icon-xuanze').eq(4).addClass('che_color')
                                                }   
                                                if(that.unit!=""){
                                                    thatsthis.find('.icon-xuanze').eq(3).addClass('che_color')
                                                }
                                                //渲染施工人
                                                
                                                if(ones.length>0){
                                                    $.each(ones,function(s,d){
                                                        chongfu(datashut,d)
                                                        thatsthis.find('.singlePerson').append(`<div class="commodity_addman" data-id="1">
                                                        <select name="" id="selects">`
                                                            +optionshit+
                                                        `</select>
                                                        <span class="iconfont icon-xuanze- shits"></span>
                                                        
                                                        </div>`);
                                                        console.log(s)
                                                    })
                                                }
                                                if(twos.length>0){
                                                    $.each(twos,function(s,d){
                                                        chongfu(datashut,d)
                                                        thatsthis.find('.picking').append(`<div class="commodity_addman" data-id="1">
                                                        <span class="iconfont icon-guanbi" ></span>
                                                        <select name="" id="selects">`
                                                            +optionshit+
                                                        `</select>
                                                        <span class="iconfont icon-xuanze- shits"></span>
                                                        
                                                        </div>`)
                
                                                    })
                                                }
                                                if(threes.length>0){
                                                    $.each(threes,function(s,d){
                                                        chongfu(datashut,d)
                                                        thatsthis.find('.constructor').append(`<div class="commodity_addman" data-id="1">
                                                        <span class="iconfont icon-guanbi" ></span>
                                                        <select name="" id="selects">`
                                                            +optionshit+
                                                        `</select>
                                                        <span class="iconfont icon-xuanze- shits"></span>
                                                        
                                                        </div>`)
                
                                                    })
                                                }
                                            }
                                        })
                                    })
                                }
                                //添加select框
                                $('.mui-scroll').on('tap','.picking_btn',function(){
                                    var that = $(this);
                                    var valus = that.parent().parent().find('.commodity_addman').length;
                                    var valText =[];
                                    console.log(valus);
                                    if(valus>0){
                                        
                                        that.parent().parent().find('.commodity_addman').each(function(v,i){
                                            console.log(v+'个');
                                            valText[v] = $(this).find('#selects').val();
                                        })
                                        if(valText.indexOf("-2")>-1){
                                            
                                            console.log(valText);
                                            mui.toast('请先选择人员!')
                                        }else{
                                            that.parent().parent().append(`<div class="commodity_addman" data-id="1">
                                                <span class="iconfont icon-guanbi" ></span>
                                                <select name="" id="selects">`
                                                    +options+
                                                `</select>
                                                <span class="iconfont icon-xuanze- shits"></span>
                                                
                                            </div>`)
                
                                        }
                                    }else{
                                        that.parent().parent().append(`<div class="commodity_addman" data-id="1">
                                            <span class="iconfont icon-guanbi" ></span>
                                            <select name="" id="selects">`
                                                +options+
                                            `</select>
                                            <span class="iconfont icon-xuanze- shits"></span>
                                            
                                        </div>`)
                                    }
                            
                                });
                            }else{
                                mui.toast('暂无人员数据')
                            }
                             
                        }
                    });
                }
            }else{
                mui.toast('暂无数据')
            }
             
        }
    }); 
    //选择提成
    $('.mui-scroll').on('tap','.shits',function(){
        // console.log('hah ');
        $(this).toggleClass('icon-xuanze-').toggleClass('icon-xuanze1').toggleClass('ggsm')
    })  
    // 选择小项
    $('.mui-scroll').on('tap','.icon-xuanze',function(){
        var num = $(this).parents('.commodity_header').find('.commodity_one').eq(0).find('.bigColor').length;
        // console.log(num);
        // 如果大于零 说明该选择项选中 如果小于等于0 则不让其选择
        if(num>0){
            $(this).toggleClass('che_color');
        }else{
            mui.toast('请勾选该商品名称')
        }
    });   
    //选择大项时  清除所有的选中
    $('.mui-scroll').on('tap','.allpitch',function(){
        // $(this).parents('.commodity_main').find('.entity_num').attr('readonly',false)
        $(this).toggleClass('icon-xuanze-').toggleClass('icon-xuanze1').toggleClass('bigColor').parents('.commodity_main').find('.commodity_aside').toggle().parents('.commodity_main').find('.iconfont').removeClass('che_color');
        if($(this).hasClass('bigColor')){
            $(this).parents('.commodity_main').find('.oneNum_people').append(`
                <div class="commodity_addman" data-id="1">
                <select name="" id="selects" disabled="disabled"><option value="`+fatherSeller_id+`">`+name+`</option></select>
                <span class="iconfont icon-xuanze- shits"></span>
            </div>
            `)
        }else{
            $(this).parents('.commodity_main').find('.oneNum_people').find('.commodity_addman').remove();
        }
    });

    // 添写商品数量
    $('.mui-scroll').on('input','.entity_num',function(){
        // console.log('hah ')
        var that = $(this);
        var text = that.val();
        text = parseInt(text);
        var entity_numbers = that.parents('.commodity_one ').find('.type_num').text();
        entity_numbers = entity_numbers.split('库存 ')[1];
        // console.log(entity_numbers);
        // console.log(text);

        // if(text>entity_numbers){
        //     mui.toast('商品数量不能多于库存');
        //     that.val('');
        // };
    });


    //点击添加人

    
    //删除select框
    $('.mui-scroll').on('tap','.icon-guanbi',function(){
        // console.log('呵呵')
        $(this).parent().remove();
    })
    //点击添加
    $('.addCommod').on('tap',function(){
        var entityObj = {}; //传递给后台的值
        var allObj = [];   //传递给后台的值
        var entityArray = [];//保存所有对象的数组集合 传递给后台的goodList;
        var arrays = []; //保存开单的id
        //用来页面之间传值的数组;
        var pageArray = [];
        var biglength = $('.bigColor').length;
        if(biglength>0){
            $('.bigColor').each(function(v,i){
                var that = $(this);
                var indexs = v;
                entityArray[indexs] = {};
                pageArray[indexs] = {};
                // var pitchOn = that.find('.bigColor').length;
                // if(pitchOn>0){
                    var good_id = that.parents('.commodity_main').data('id'); //保存id
                    console.log(good_id)
                    var type_num = that.parents('.commodity_main').find('.entity_num').val(); //保存数量 
                    var real_price = that.parents('.commodity_main').find('.entity_price').val(); //保存价格
                    var goods_name = that.parents('.commodity_one').find('.comm_name').val(); //保存name 
                    var average_price = that.parents('.commodity_one').data('average'); //入库价格
                    // console.log(goods_name)
                    if(!type_num){
                        type_num=1;
                    }
                    real_price=real_price.split('￥')[1];
                    // console.log(type_num)
                    entityArray[indexs].goods_id=good_id;
                    entityArray[indexs].shopNum=type_num;
                    entityArray[indexs].is_virtual=2; 
                    entityArray[indexs].goods_name=goods_name; 
                    entityArray[indexs].goods_info=goods_name; 
                    entityArray[indexs].is_goods_name=1;    //是否显示名称 默认显示 为1
                    entityArray[indexs].is_goods_brand=0;   //是否显示品牌
                    entityArray[indexs].is_goods_model=0;   //是否显示型号
                    entityArray[indexs].is_goods_unit=0;    //是否显示单位
                    entityArray[indexs].is_selling_price=0; //是否显示价格
                    entityArray[indexs].selling_price=real_price; //是否显示价格
                    entityArray[indexs].real_price=real_price; //是否显示价格
                    entityArray[indexs].is_specification=0; //是否显示规格
                    entityArray[indexs].average_price = average_price; //保存入库价格
                    entityObj.goods_id = good_id; //传递给后台的值
                    //添加对象
                    pageArray[indexs]={goods_id:good_id,goods_name:goods_name,brand:'',model:'',apecification:'',unit:'',price:'',orderprice:real_price,type_num:type_num,kaidan:[],lingliao:[],shigong:[]}; 
                    var textId = that.parents('.commodity_main').find('.singlePerson').find('.commodity_addman').length; //订单人数
                    var nums = that.parents('.commodity_main').find('.picking').find('.commodity_addman').length;        //领料人数
                    var shigongs = that.parents('.commodity_main').find('.constructor').find('.commodity_addman').length; //施工人数
    
                    if(textId>0){
                        entityObj.type = '1'; 
                        // entityArray[indexs].type = 1;
                        // entityArray[indexs].name = [];
                        that.parents('.commodity_main').find('.singlePerson').find('.commodity_addman').each(function(v,i){
                            var seller_id = $(this).find('#selects').val(); //获得开单人的id
                            var options=$(this).find('#selects option:selected').text();; //获取选中的项
                            var sss = $(this).find('.ggsm').length;
                            var is_money = '0';
                            if(sss>0){
                                is_money='1';
                            }
                            entityObj.seller_id = seller_id;
                            entityObj.is_money = is_money;
                            allObj.push(JSON.stringify(entityObj));



                            // entityObj.seller_id = seller_id; //直接存对象会覆盖
                            arrays[v] = seller_id;
                            pageArray[indexs].kaidan[v] = options;
                            console.log(options);
                        })
                        console.log(entityObj);  //  保存对象
                        arrays = arrays.distinct();  //去重
                        pageArray[indexs].kaidan = pageArray[indexs].kaidan.distinct();//去重
                        // console.log(arrays);  // 保存id arrone.distinct()

                        // for(var i=0;i<arrays.length;i++){
                        //     entityObj.seller_id = arrays[i];
                        //     allObj.push(JSON.stringify(entityObj));
                        // }

                        console.log(allObj);  // 传递给后台值的函数     
                        // console.log(arrays);  // 传递页面的函数     
                        // console.log(entityArray);  // 传递值 的函数     
                        if(arrays.indexOf("-2")>-1){
                            mui.toast('请选择工作人员')
                            return false;
                            
                        }
                        
                    }
                    if(nums>0){
                        entityObj.type = '2'; 
                        // entityArray[indexs].type = 2;
                        // entityArray[indexs].lingliao = [];
                        that.parents('.commodity_main').find('.picking').find('.commodity_addman').each(function(v,i){
                            var seller_id = $(this).find('#selects').val(); //获得开单人的id
                            var options=$(this).find('#selects option:selected').text();; //获取选中的项
                            var sss = $(this).find('.ggsm').length;
                            var is_money = '0';
                            if(sss>0){
                                is_money='1';
                            }
                            entityObj.seller_id = seller_id;
                            entityObj.is_money = is_money;
                            allObj.push(JSON.stringify(entityObj));

                            arrays[v] = seller_id;
                            pageArray[indexs].lingliao[v] = options;
                            // entityArray[indexs].lingliao[v] = options;
                            console.log(options);
                        })
                        console.log(entityObj); 
                        arrays = arrays.distinct();  //去重
                        pageArray[indexs].lingliao = pageArray[indexs].lingliao.distinct();//去重    
                        // for(var i=0;i<arrays.length;i++){
                        //     entityObj.seller_id = arrays[i];
                        //     allObj.push(JSON.stringify(entityObj));
                        // } 
                        // console.log(arrays);  // 传递页面的函数     
                        if(arrays.indexOf("-2")>-1){
                            mui.toast('请选择工作人员')
                            return false;
                            
                        }
                        
                    }
                    if(shigongs>0){
                        entityObj.type = '3'; 
                        // entityArray[indexs].type = 3;
                        // entityArray[indexs].shogong = [];
                        that.parents('.commodity_main').find('.constructor').find('.commodity_addman').each(function(v,i){
                            var seller_id = $(this).find('#selects').val(); //获得开单人的id
                            var options=$(this).find('#selects option:selected').text();; //获取选中的项
                            
                            var sss = $(this).find('.ggsm').length;
                            var is_money = '0';
                            if(sss>0){
                                is_money='1';
                            }
                            entityObj.seller_id = seller_id;
                            entityObj.is_money = is_money;
                            allObj.push(JSON.stringify(entityObj));

                            // addObj.seller_id = seller_id; 直接存对象会覆盖
                            arrays[v] = seller_id;
                            pageArray[indexs].shigong[v] = options;
                            // entityArray[indexs].shogong[v] = options;
                            console.log(options);
                        })
                        arrays = arrays.distinct();  //去重
                        pageArray[indexs].shigong = pageArray[indexs].shigong.distinct();//去重   
                        // for(var i=0;i<arrays.length;i++){
                        //     entityObj.seller_id = arrays[i];
                        //     allObj.push(JSON.stringify(entityObj));
                        // }  
                        console.log(arrays);  // 传递页面的函数  
                        if(arrays.indexOf("-2")>-1){
                            mui.toast('请选择工作人员');
                            return false;
                        }   
                        
                    }
                    
                    //拿到要展示的值
                    var bb = that.parents('.commodity_main').find('.che_color').length;
                    if(bb>0){
                        that.parents('.commodity_main').find('.che_color').each(function(){
                            var te =$(this).parent().find('.comm_name').val();
                            var pitchs =$(this).parent().data('pitch');
                            if(pitchs == 1){
                                entityArray[indexs].is_goods_brand=1; //品牌
                                pageArray[indexs].brand = te;
                            }else if(pitchs ==2){
                                entityArray[indexs].is_goods_model=1;
                                pageArray[indexs].model = te;
                            }else if(pitchs ==3){
                                entityArray[indexs].is_apecification=1;
                                pageArray[indexs].apecification = te;
                                
                            }else if(pitchs ==4){
                                entityArray[indexs].is_goods_unit=1;
                                pageArray[indexs].unit = te;
                                
                            }else if(pitchs ==5){
                                entityArray[indexs].is_selling_price=1;
                                entityArray[indexs].selling_price=real_price;
                                pageArray[indexs].price = real_price;
                                
                            }
                            console.log(te);
                            console.log(pitchs);
                        })
                    }
    
                    // console.log(entityArray)
                // }
            })
            console.log(pageArray)
            
            // console.log(arrays)
            // console.log(entityArray)
            // console.log(allObj)
            
            if(arrays.indexOf("-2")>-1){
                mui.toast('请选择工作人员')
            }else{
                for(var s=0;s<allObj.length;s++){
                    // console.log(allobj[s]);  // 传递值 的函数 
                    allObj[s] =  JSON.parse(allObj[s]);
                    
                }
                console.log('我是最后')
                sessionStorage.setItem('entityArray',JSON.stringify(entityArray)); //实体商品要传给后台是数据
                sessionStorage.setItem('entityObjs',JSON.stringify(allObj));  //实体商品要传给后台是数据
                sessionStorage.setItem('pageArray',JSON.stringify(pageArray));  //页面传递的数据
                location.href = '../billing.html'
                // history.go(-1);
                
            }

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