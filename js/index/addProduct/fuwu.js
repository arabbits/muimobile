

$(function(){
    var addProductList = sessionStorage.getItem('addProductList');
    if(!!addProductList){
        addProductList= JSON.parse(addProductList);
        var fuwuObj = addProductList.data.goodsList; // 原本的商品列表
        var oldGoodId =[];
        $.each(fuwuObj,function(v,i){
            oldGoodId.push(i.goods_id)
        })
        console.log(addProductList);
        var search_name ;
        readerMain(store_id,search_name)
        function readerMain(store_id,search_name){
            // search_name = '' ||search_name;
            $.ajax({
                url:api+'smobileInquireGoods',
                type:'post',
                headers:{'sellermobileauthkey':token},
                beforeSend:function(){
                    $('.loading').show();
                },
                data:{
                    page : 1,
                    limit: 100,
                    store_id: store_id,
                    is_virtual: 1,
                    'key[goods_name]':search_name,
                    is_putaway:1
                },
                success:function(res){
                    console.log(res);
                    $('.loading').hide();
                    $('.che_main').show();
                    if(res.result){
                        // var length = res.data.length;
                        // $('.tixing_nums').text('('+length+')')
                        if(res.data.length<=0){
                            mui.toast('暂无数据')
                        }else{
                            $('.commod_mains').html(template('tpl',res));
                            $('.che_footer').show();
                            //获得施工人员的信息
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
                                        var datashut = data.data;
                                        // console.log(datashut);
                                        var options='<option value="-2">请选择</option>' ;
                                        
                                        for(var i=0;i<datashut.length;i++){
                                            options +='<option value="'+datashut[i].seller_id+'">'+datashut[i].seller_account+'</option>';
                                            // console.log(options)
                                        }
                                        // 点击添加select 框       
                                        $('.mui-scroll').on('tap','.picking_btn',function(){
                                            var that = $(this);
                                            var valus = that.parent().parent().find('.commodity_addman').length;
                                            var valText =[];
                                            // console.log(valus);
                                            if(valus>0){
                                                
                                                that.parent().parent().find('.commodity_addman').each(function(v,i){
                                                    // console.log(v+'个');
                                                    valText[v] = $(this).find('#selects').val();
                                                })
                                                if(valText.indexOf("-2")>-1){
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
                                        mui.toast('暂无数据')
                                    }
                                     
                                }
                            });   
                        }
                    }else{
                        mui.toast('暂无数据')
                    }
                }
            })
    
        }
        //选择提成
        $('.mui-scroll').on('tap','.shits',function(){
            // console.log('hah ');
            $(this).toggleClass('icon-xuanze-').toggleClass('icon-xuanze1').toggleClass('ggsm')
        })
        //模糊搜索
        $('.search').on('input',function(){
            search_name = $(this).val();
            console.log(search_name);
            readerMain(store_id,search_name)
        })
        // 选择商品
        $('.mui-scroll ').on('tap','.clicks',function(){
            var id = $(this).find('.icon-xuanze').data('id');
            // console.log(id);
            if(oldGoodId.indexOf(id)>-1){
                // console.log(oldGoodId);
                mui.toast('您已添加过此商品!');
            }else{
                $(this).find('.icon-xuanze').toggleClass('che_color').parents('.commodity_main').find('.commodity_aside').toggle();
                if($(this).find('.icon-xuanze').hasClass('che_color')){
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
            
        })
        
        // 点击删除select框
        $('.mui-scroll').on('tap','.icon-guanbi',function(){
            
            $(this).parent().remove();
        })
        // 删除数组内good_id 相同的值
        function removeArr(arr,item){
            var newarr = [];
            for(var i=0;i<arr.length;i++){
                if(arr[i].goods_id != item){
                    newarr.push(arr[i]);
                }
            }
            return newarr;
        }
    
        //点击添加
        $('.addCommod').on('tap',function(){
            // var text = $('#selects').val();
            var prevObj = sessionStorage.getItem('addObjGood'); // 公用一个session
            var linshiArr = []; //存放所有临时添加的商品 不止一个;
            if(prevObj){
                linshiArr=JSON.parse(prevObj);
            }
            var ordersNums = $('.che_color').length;
            
            console.log(ordersNums);
            // var addObj = {}
            // var arr = new Array();
            // var arr = {};
            var addObj = {}; //保存对象
            var arrays = [];//保存id
            var goodsList = []; //传递价格 名称
            var priceArr = []  //判断是否有未输入价格
            var commObj = {};
            if(ordersNums>0){
                $('.che_color').each(function(v,i){
                    var allobj = []; //传递值 的函数
                    
                    var thats = $(this);
                    var goods_id = thats.data('id');
                    addObj.goods_id = goods_id+'';
                    // goodObj.goods_id = goods_id+'';
                    // console.log(goods_id);
                    // arr;
                    var textId = thats.parents('.commodity_main').find('.singlePerson').find('.commodity_addman').length; //订单人数
                    var nums = thats.parents('.commodity_main').find('.picking').find('.commodity_addman').length;        //领料人数
                    var shigongs = thats.parents('.commodity_main').find('.constructor').find('.commodity_addman').length; //施工人数
                    
                    var billingName = thats.parents('.commodity_main').find('.comm_name').val(); //产品名称
                    var billingPrice = thats.parents('.commodity_main').find('.comm_price').val(); //产品价格
                    priceArr[v] = billingPrice;
                    if(!billingPrice){
                        // mui.toast('请输入价格')
                        return false;
                    }
                    // console.log(billingPrice);
                    // console.log(billingName);
                    goodsList[v] = {goods_id:goods_id,goods_name:billingName,goods_info:billingName,selling_price:billingPrice,real_price:billingPrice,shopNum:1,is_virtual:1,
                        is_specification:'',is_goods_brand:'',is_goods_model:'',is_goods_name:'',is_goods_unit:'',is_selling_price:''};//传递价格 名称
                    
                    
                    // 如果添加订单人有的话
                    var num = v;
                    if(textId>0){
                        addObj.type = '1';
                        thats.parents('.commodity_main').find('.singlePerson').find('.commodity_addman').each(function(v,i){
                            var seller_id = $(this).find('#selects').val(); //获得开单人的id
                            var options=$(this).find('#selects option:selected').text();; //获取选中的项
                            var sss = $(this).find('.ggsm').length;
                            var is_money = '0';
                            if(sss>0){
                                is_money='1';
                            }
                            // addObj.seller_id = seller_id; 直接存对象会覆盖
    
                            arrays[v] = seller_id;
                            addObj.seller_id = seller_id;
                            addObj.is_money = is_money;
                            addObj.seller_account = options;
                            addObj.id = 0;
                            allobj.push(JSON.stringify(addObj));
                            console.log(options);
                        })
                        arrays = arrays.distinct();
                        
                    }
                    //如果领料人有人的话
                    if(nums>0){
                        addObj.type = '2';
                        thats.parents('.commodity_main').find('.picking').find('.commodity_addman').each(function(v,i){
                            var seller_id = $(this).find('#selects').val(); //获得开单人的id
                            arrays[v] = seller_id;
                            var options=$(this).find('#selects option:selected').text();; //获取选中的项
                            var sss = $(this).find('.ggsm').length;
                            var is_money = '0';
                            if(sss>0){
                                is_money='1';
                            }
                            addObj.seller_id = seller_id;
                            addObj.is_money = is_money;
                            addObj.seller_account = options;
                            addObj.id = 0;
                            
                            allobj.push(JSON.stringify(addObj));
                        })
                        arrays = arrays.distinct();
                        
                    }
                    // 施工人数
                    if(shigongs>0){
                        addObj.type = '3';
                        thats.parents('.commodity_main').find('.constructor').find('.commodity_addman').each(function(v,i){
                            var seller_id = $(this).find('#selects').val(); //获得开单人的id
                            arrays[v] = seller_id;
                            var options=$(this).find('#selects option:selected').text();; //获取选中的项
                            var sss = $(this).find('.ggsm').length;
                            var is_money = '0';
                            if(sss>0){
                                is_money='1';
                            }
                            addObj.seller_id = seller_id;
                            addObj.is_money = is_money;
                            addObj.seller_account = options;
                            addObj.id = 0;
                            allobj.push(JSON.stringify(addObj));
                        })
                        arrays = arrays.distinct();
                    }
                    goodsList[v].sellerList = [];
                    for(var s=0;s<allobj.length;s++){
                        // console.log(allobj[s]);  // 传递值 的函数 
                        goodsList[v].sellerList[s] =  JSON.parse(allobj[s]);
                        
                    }
                    
                })
                if(priceArr.indexOf("")>-1){
                    mui.toast('请输入价格')
                    
                }else if(arrays.indexOf("-2")>-1){
                    mui.toast('请选择人员')
                    console.log(goodsList);  // 传递值 的函数     
                    console.log(priceArr);  // 传递值 的函数    
                    console.log(arrays);  // 查看options中的值 /
                }else{ 
                    // console.log(store_id);
                    
                    console.log(goodsList);  // 传递值 的函数  
                    linshiArr = goodsList.reduce( function(coll,item){
                        coll.push( item );
                        return coll;
                    }, linshiArr );   
                    sessionStorage.setItem('addObjGood',JSON.stringify(linshiArr));
                    fuwuObj = goodsList.reduce( function(coll,item){
                        coll.push( item );
                        return coll;
                    }, fuwuObj );   
                    addProductList.data.goodsList = fuwuObj;
                    console.log(addProductList);  // 传递值 的函数  
                    sessionStorage.setItem('addProductList',JSON.stringify(addProductList));
                    
                    location.href = './addproduct.html';
                    
                } 
                
            }else if(ordersNums==0){
                mui.toast('请选择商品')
            }
        })


    }else{
        location.href = "/index.html"
    }

})