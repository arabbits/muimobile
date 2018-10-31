


$(function(){
    
    //遍历添加数据
    var addProductList = sessionStorage.getItem('addProductList');
    if(!!addProductList){
        addProductList= JSON.parse(addProductList);
        var fuwuObj = addProductList.data.goodsList; // 原本的商品列表
        var oldGoodId =[];
        $.each(fuwuObj,function(v,i){
            oldGoodId.push(i.goods_id)
        });
        console.log(addProductList);
        console.log(oldGoodId);

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
                // console.log(data);
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
                                // console.log(data);
                                $('.che_footer').show();
                                $('.loading').hide();
                                $('.che_main').show();
                                
                                if(data.result){
                                    var datashut = data.data;
                                    // console.log(datashut);
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
            var id = $(this).parents('.commodity_main').data('id');
            if(oldGoodId.indexOf(id)>-1){
                mui.toast('您已添加过此商品!');
            }else{
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
        });
        //删除select框
        $('.mui-scroll').on('tap','.icon-guanbi',function(){
            // console.log('呵呵')
            $(this).parent().remove();
        })
        //点击添加
        $('.addCommod').on('tap',function(){
            var prevObj = sessionStorage.getItem('addObjGood'); // 公用一个session
            var linshiArr = []; //存放所有临时添加的商品 不止一个;
            if(prevObj){
                linshiArr=JSON.parse(prevObj);
            }
            var entityObj = {}; //传递给后台的值
            var allObj = [];   //传递给后台的值
            var entityArray = [];//保存所有对象的数组集合 传递给后台的goodList;
            var arrays = []; //保存开单的id
            //用来页面之间传值的数组;
            var biglength = $('.bigColor').length;
            if(biglength>0){
                $('.bigColor').each(function(v,i){
                    var that = $(this);
                    var indexs = v;
                    entityArray[indexs] = {};
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
                                entityObj.seller_account = options;
                                entityObj.id = 0;
                                allObj.push(JSON.stringify(entityObj));



                                // entityObj.seller_id = seller_id; //直接存对象会覆盖
                                arrays[v] = seller_id;
                            })
                            console.log(entityObj);  //  保存对象
                            arrays = arrays.distinct();  //去重 
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
                                entityObj.seller_account = options;
                                entityObj.id = 0;
                                allObj.push(JSON.stringify(entityObj));

                                arrays[v] = seller_id;
                                // entityArray[indexs].lingliao[v] = options;
                                console.log(options);
                            })
                            console.log(entityObj); 
                            arrays = arrays.distinct();  //去重
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
                                entityObj.seller_account = options;
                                entityObj.id = 0;
                                
                                allObj.push(JSON.stringify(entityObj));

                                // addObj.seller_id = seller_id; 直接存对象会覆盖
                                arrays[v] = seller_id;
                                // entityArray[indexs].shogong[v] = options;
                                console.log(options);
                            })
                            arrays = arrays.distinct();  //去重
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
                                var te =$(this).parent().find('.comm_name').val(); //
                                var pitchs =$(this).parent().data('pitch');
                                if(pitchs == 1){
                                    entityArray[indexs].is_goods_brand=1; //品牌
                                }else if(pitchs ==2){
                                    entityArray[indexs].is_goods_model=1;
                                }else if(pitchs ==3){
                                    entityArray[indexs].is_apecification=1;
                                    
                                }else if(pitchs ==4){
                                    entityArray[indexs].is_goods_unit=1;
                                    
                                }else if(pitchs ==5){
                                    entityArray[indexs].is_selling_price=1;
                                    entityArray[indexs].selling_price=real_price;
                                }
                                console.log(te);
                                console.log(pitchs);
                            })
                        }
                        entityArray[indexs].sellerList =[]
                        for(var s=0;s<allObj.length;s++){
                            entityArray[indexs].sellerList[s] =  JSON.parse(allObj[s]);
                        }
                        // console.log(entityArray)
                    // }
                })
                
                if(arrays.indexOf("-2")>-1){
                    mui.toast('请选择工作人员')
                }else{
                    linshiArr = entityArray.reduce( function(coll,item){
                        coll.push( item );
                        return coll;
                    }, linshiArr ); 
                    sessionStorage.setItem('addObjGood',JSON.stringify(linshiArr)); //实体商品要传给后台是数据
                    fuwuObj = entityArray.reduce( function(coll,item){
                        coll.push( item );
                        return coll;
                    }, fuwuObj );      
                    addProductList.data.goodsList = fuwuObj;
                    console.log(addProductList);  // 传递值 的函数  
                    sessionStorage.setItem('addProductList',JSON.stringify(addProductList));
                    location.href = './addproduct.html';
                    // sessionStorage.setItem('entityArray',JSON.stringify(entityArray)); //实体商品要传给后台是数据
                    // sessionStorage.setItem('entityObjs',JSON.stringify(allObj));  //实体商品要传给后台的订单人
                    // location.href = '../billing.html'
                    
                }

            }else{
                mui.toast('请选择商品')
            }
        })
        
    }else{
        location.href = "/index.html"
    }
})