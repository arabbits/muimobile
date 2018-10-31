

$(function(){
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
                                    // console.log(options)
                                    //如果有值  说明保存的有东西需要展示出来
                                    var commObjShit = sessionStorage.getItem('commObj');
                                    if(commObjShit){
                                        commObjShit = JSON.parse(commObjShit);
                                        console.log(commObjShit);
                                        $.each(commObjShit,function(v,i){
                                            var that = i;
                                            var id = that.goods_id;
                                            var ones = that.name;
                                            var twos = that.lingliao;
                                            var threes = that.shigong;
                                            // console.log(id)
                                            // console.log(ones)
                                            $('.mui-scroll .icon-xuanze').each(function(index,val){
                                                var thatsthis = $(this);
                                                var foodid = $(this).data('id');
                                                // console.log(foodid)
                                                if(id ==foodid){
                                                    // mui.toast('就摔死我'+index)
                                                    thatsthis.addClass('che_color').parents('.commodity_main').find('.commodity_aside').toggle(); //展开隐藏的select;
                                                    thatsthis.parents('.commodity_main').find('.comm_price').val(that.selling_price); //添加价格
                                                    var optionshit ;
                                                    function chongfu(datashut,d){
                                                        optionshit = '<option value="-2">请选择</option>' ;
                                                        for(var i=0;i<datashut.length;i++){
                                                            datashut[i].seller_account ==d?optionshit+='<option value="'+datashut[i].seller_id+'" selected>'+datashut[i].seller_account+'</option>':optionshit +='<option value="'+datashut[i].seller_id+'">'+datashut[i].seller_account+'</option>';
                                                        }
                                                    }
                                                    if(ones.length>0){
                                                        $.each(ones,function(s,d){
                                                            chongfu(datashut,d)
                                                            thatsthis.parents('.commodity_main').find('.singlePerson').append(`<div class="commodity_addman" data-id="1">
                                                            <select name="" id="selects">`
                                                                +optionshit+
                                                            `</select>
                                                            <span class="iconfont icon-xuanze- shits"></span>
                                                            </div>`);
                                                            // console.log(s)
                                                        })
                                                    }
                                                    if(twos.length>0){
                                                        $.each(twos,function(s,d){
                                                            chongfu(datashut,d)
                                                            thatsthis.parents('.commodity_main').find('.picking').append(`<div class="commodity_addman" data-id="1">
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
                                                            thatsthis.parents('.commodity_main').find('.constructor').append(`<div class="commodity_addman" data-id="1">
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
                                                
                                                // console.log(valText);
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
                        
                        // 添加验车单信息
                        var verstiy = $(".commod_mains .icon-xuanze").length;
                        var validate= localStorage.getItem('validate');
                        
                        if(validate.length>2){
                            validate = JSON.parse(validate);
                            // console.log(validate);
                            $.each(validate,function(v,i){
                                var validaId = i.goods_id;
                                var grade = i.grade
                                // console.log(grade);
                                $(".commod_mains .icon-xuanze").each(function(s,k){
                                    var timersId = $(this).data('id');
                                    if(validaId == timersId){
                                        // console.log(timersId);
                                        if(grade==1){
                                            $(this).parents('.commodity_header').find('.examine_bgc').addClass('redas');
                                        }else if(grade==2){
                                            $(this).parents('.commodity_header').find('.examine_bgc').addClass('greans');
                                        }
                                    }
                                })
                            })

                        }
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
        //  seller_id与name是登录时获取的 
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
    })
    
    // 点击删除select框
    $('.mui-scroll').on('tap','.icon-guanbi',function(){
        
        $(this).parent().remove();
    })
    var searchCommObj = sessionStorage.getItem('commObj');
    var searchGoodsList = sessionStorage.getItem('goodsList');
    var searchGoodsSeller = sessionStorage.getItem('goodsSeller');
    if(!!searchCommObj){
        searchCommObj= JSON.parse(searchCommObj);
        searchGoodsList= JSON.parse(searchGoodsList);
        searchGoodsSeller= JSON.parse(searchGoodsSeller);
        console.log(searchGoodsSeller.length)
    }
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
        var ordersNums = $('.che_color').length;
        
        console.log(ordersNums);
        // var addObj = {}
        // var arr = new Array();
        // var arr = {};
        var addObj = {}; //保存对象
        var arrays = [];//保存id
        var allobj = []; //传递值 的函数
        var goodsList = []; //传递价格 名称
        var priceArr = []  //判断是否有未输入价格
        var commObj = {}.commArr=[];
        if(ordersNums>0){
            $('.che_color').each(function(v,i){
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
                commObj[v] = {goods_id:goods_id,goods_name:billingName,selling_price:billingPrice,shopNum:1,name:[],lingliao:[],shigong:[]}
                // commObj.data = [];
                // commObj.data[v] =  goodsList[v];
                // console.log(commObj);
                
                // 如果添加订单人有的话
                var num = v;
                if(textId>0){
                    addObj.type = '1';
                    commObj[num].type = 1;
                    commObj[num].name = [];
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
                        commObj[num].name[v] = options;
                        addObj.seller_id = seller_id;
                        addObj.is_money = is_money;
                        
                        allobj.push(JSON.stringify(addObj));
                        console.log(options);
                    })
                    // console.log(addObj);  //  保存对象
                    arrays = arrays.distinct();
                    // commObj[num].name =  commObj[num].name.distinct();
                    // // console.log(arrays);  // 保存id arrone.distinct()
                    // for(var i=0;i<arrays.length;i++){
                    //     addObj.seller_id = arrays[i];
                    //     allobj.push(JSON.stringify(addObj));
                    // }
                    console.log(allobj);  // 传递值 的函数     
                    
                }
                //如果领料人有人的话
                if(nums>0){
                    addObj.type = '2';
                    commObj[num].lingliao = [];
                    thats.parents('.commodity_main').find('.picking').find('.commodity_addman').each(function(v,i){
                        var seller_id = $(this).find('#selects').val(); //获得开单人的id
                        arrays[v] = seller_id;
                        var options=$(this).find('#selects option:selected').text();; //获取选中的项
                        var sss = $(this).find('.ggsm').length;
                        var is_money = '0';
                        if(sss>0){
                            is_money='1';
                        }
                        commObj[num].lingliao[v] = options;
                        addObj.seller_id = seller_id;
                        addObj.is_money = is_money;
                        
                        allobj.push(JSON.stringify(addObj));
                    })
                    arrays = arrays.distinct();
                    commObj[num].lingliao = commObj[num].lingliao.distinct();
                    // for(var i=0;i<arrays.length;i++){
                    //     addObj.seller_id = arrays[i];
                    //     allobj.push(JSON.stringify(addObj));
                    // }
                    
                }
                // 施工人数
                if(shigongs>0){
                    addObj.type = '3';
                    commObj[num].shigong = [];
                    thats.parents('.commodity_main').find('.constructor').find('.commodity_addman').each(function(v,i){
                        var seller_id = $(this).find('#selects').val(); //获得开单人的id
                        arrays[v] = seller_id;
                        var options=$(this).find('#selects option:selected').text();; //获取选中的项
                        commObj[num].shigong[v] = options;
                        var sss = $(this).find('.ggsm').length;
                        var is_money = '0';
                        if(sss>0){
                            is_money='1';
                        }
                        addObj.seller_id = seller_id;
                        addObj.is_money = is_money;
                        
                        allobj.push(JSON.stringify(addObj));
                    })
                    arrays = arrays.distinct();
                    commObj[num].shigong = commObj[num].shigong.distinct();
                    // for(var i=0;i<arrays.length;i++){
                    //     addObj.seller_id = arrays[i];
                    //     allobj.push(JSON.stringify(addObj));
                    // }
                }

            })
            if(priceArr.indexOf("")>-1){
                mui.toast('请输入价格')
                
            }else if(arrays.indexOf("-2")>-1){
                mui.toast('请选择人员')
                console.log(allobj);  // 传递值 的函数     
                console.log(goodsList);  // 传递值 的函数     
                console.log(priceArr);  // 传递值 的函数    
                console.log(arrays);  // 查看options中的值 /
            }else{
                console.log(commObj);  //  保存对象
                console.log(goodsList);  // 传递值 的函数     
                console.log(allobj);  // 传递值 的函数   
                // console.log(store_id);
                var goodsSeller = [];
                for(var s=0;s<allobj.length;s++){
                    // console.log(allobj[s]);  // 传递值 的函数 
                    goodsSeller[s] =  JSON.parse(allobj[s]);
                    
                }
                // console.log(JSON.stringify(goodsSeller)); is_virtual
                
                // sessionStorage.setItem('goodsSeller',JSON.stringify(goodsSeller));
                // sessionStorage.setItem('goodsList',JSON.stringify(goodsList));
                // sessionStorage.setItem('commObj',JSON.stringify(commObj));
                if(!!searchCommObj && searchCommObj.length>0){

                    $.each(searchCommObj,function(v,i){
                        var ssv = v;
                        var searchGoodId = i.goods_id; // 原本已经存在的商品id
                        $.each(commObj,function(k,j){
                            var searchCommonId = j.goods_id; // 新选择的商品id
                            if(searchCommonId == searchGoodId){
                                searchCommObj = removeArr(searchCommObj,searchCommonId);
                                // commObj.push(searchCommObj[ssv])
                                searchGoodsList = removeArr(searchGoodsList,searchCommonId);
                                searchGoodsSeller = removeArr(searchGoodsSeller,searchCommonId);
                            }
                        })
                    });
                    console.log(commObj)
                    console.log(searchCommObj)
                    commObj = searchCommObj.reduce( function(coll,item){
                        coll.push( item );
                        return coll;
                    }, commObj );
                    goodsList = searchGoodsList.reduce( function(coll,item){
                        coll.push( item );
                        return coll;
                    }, goodsList );
                    goodsSeller = searchGoodsSeller.reduce( function(coll,item){
                        coll.push( item );
                        return coll;
                    }, goodsSeller );
                    sessionStorage.setItem('commObj',JSON.stringify(commObj));
                    sessionStorage.setItem('goodsList',JSON.stringify(goodsList));
                    sessionStorage.setItem('goodsSeller',JSON.stringify(goodsSeller));

                    location.href = '../billing.html';
                }else{
                    sessionStorage.setItem('goodsSeller',JSON.stringify(goodsSeller));
                    sessionStorage.setItem('goodsList',JSON.stringify(goodsList));
                    sessionStorage.setItem('commObj',JSON.stringify(commObj));
                    location.href = '../billing.html';
                }
            } 
            
        }else if(ordersNums==0){
            mui.toast('请选择商品')
        }
        // var nums = $('.picking').find('.commodity_addman').length;
        // var shigongs = $('.constructor').find('.commodity_addman').length;
        // var arrone = [],
        //     arrtwo = [];
        // if(nums>0){
        //     $('.picking').find('.commodity_addman').each(function(v,i){
        //         var text = $(this).find('#selects').val();
        //         console.log(text)
        //         console.log(v)
        //         arrone[v] = text;
        //     })
        // }
        // if(shigongs>0){
            
        //     $('.constructor').find('.commodity_addman').each(function(v,i){
        //         var text = $(this).find('#selects').val();
        //         console.log(text)
        //         arrtwo[v] = text;
        //     })
        // }

        // location.href = '../billing.html'
        // arrone.distinct();给原型添加方法
        // console.log(arrone)
        // console.log(arrone.distinct())
        
        // console.log(arrtwo.distinct())
    })

    //点击新建
    $('.jiedan').on('tap',function(){
        console.log('看看');
        location.href = './addPro.html'
    })
})