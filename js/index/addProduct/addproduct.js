

$(function(){
    var addProductList = sessionStorage.getItem('addProductList');
    $('.loading').hide()

    if(!!addProductList ){
        addProductList=JSON.parse(addProductList);
        console.log(addProductList);
        var fuwuObj = addProductList.data.goodsList; // 原本的商品列表
        $('.mui-scroll').html(template('serve',addProductList));
        $('.loading').show();
        // 添加商品跳转
        $('.mui-scroll').on('tap','.picking_btn',function(){
            var id = $(this).data('id');
            console.log(id)
            if(id==1){
                //服务商品
                location.href = "./fuwu.html"
            }else if(id==2){
                //服务商品
                location.href = "./shiti.html"
            }else if(id==3){
                //服务商品
                location.href = "./linshi.html"
            }
        })
        function removeArr(arr,item){
            var newarr = [];
            for(var i=0;i<arr.length;i++){
                if(arr[i].goods_id != item){
                    newarr.push(arr[i]);
                }
            }
            return newarr;
        }
        function removeLinshi(arr,item){
            var newarr = [];
            for(var i=0;i<arr.length;i++){
                if(arr[i].goods_name != item){
                    newarr.push(arr[i]);
                }
            }
            return newarr;
        }
        function deleteObj(good_id){
            var addObjGood = sessionStorage.getItem('addObjGood');
            addObjGood = JSON.parse(addObjGood);
            addObjGood = removeArr(addObjGood,good_id);
            sessionStorage.setItem('addObjGood',JSON.stringify(addObjGood));
        }
        function deleteLin(item){
            var addObjGood = sessionStorage.getItem('addObjGood');
            addObjGood = JSON.parse(addObjGood);
            addObjGood = removeLinshi(addObjGood,item);
            sessionStorage.setItem('addObjGood',JSON.stringify(addObjGood));
        }
        // 删除
        $('.mui-scroll').on('tap','.icon-shanchu1',function(){
            var addProductList = sessionStorage.getItem('addProductList'); //  获得最新的参数
            addProductList=JSON.parse(addProductList);
            var fuwuObj = addProductList.data.goodsList;
            console.log(fuwuObj);
            var delGoodsObj = sessionStorage.getItem('delGoods');  //  获得删除的id
            var delGoods;
            if(!!delGoodsObj){
                delGoods= delGoodsObj;
            };
            var that = $(this);
            var id = that.data('id');
            var addid = that.data('addid');
            console.log(addid)
            console.log(!addid)
            if(!!addid){  // 是之前的订单的商品
                if(!!id){
                    mui.confirm('真的要删除此商品么?',function(index){
                        if(index.index==1){
                            that.parents('.twoHeader').remove();
                            fuwuObj = removeArr(fuwuObj,id);
                            console.log(fuwuObj);
                            addProductList.data.goodsList=fuwuObj;
                            if(!!delGoods){
                                delGoods =delGoods+','+addid;
                            }else{
                                delGoods = addid;
                            }
                            sessionStorage.setItem('addProductList',JSON.stringify(addProductList));
                            sessionStorage.setItem('delGoods',delGoods);
                        }
                    });

                }else{ 
                    var pageid = that.parents('.twoHeader').data('pageid');
                    console.log(pageid);
                    mui.confirm('真的要删除此商品么?',function(index){
                        if(index.index==1){
                            that.parents('.twoHeader').remove();
                            fuwuObj = removeLinshi(fuwuObj,pageid);
                            console.log(fuwuObj);
                            addProductList.data.goodsList=fuwuObj;
                            if(!!delGoods){
                                delGoods =delGoods+','+addid;
                            }else{
                                delGoods = addid;
                            }
                            sessionStorage.setItem('addProductList',JSON.stringify(addProductList));
                            sessionStorage.setItem('delGoods',JSON.stringify(delGoods));
                            
                        }
                    });
                }
                
            }else{  // 是之后加的订单的商品
                if(!!id){
                    mui.confirm('真的要删除此商品么?',function(index){
                        if(index.index==1){
                            that.parents('.twoHeader').remove();
                            fuwuObj = removeArr(fuwuObj,id);
                            console.log(fuwuObj);
                            addProductList.data.goodsList=fuwuObj;
                            deleteObj(id)
                            sessionStorage.setItem('addProductList',JSON.stringify(addProductList));
                        }
                    });

                }else{ 
                    var pageid = that.parents('.twoHeader').data('pageid');
                    console.log(pageid);
                    mui.confirm('真的要删除此商品么?',function(index){
                        if(index.index==1){
                            that.parents('.twoHeader').remove();
                            fuwuObj = removeLinshi(fuwuObj,pageid);
                            console.log(fuwuObj);
                            addProductList.data.goodsList=fuwuObj;
                            deleteLin(pageid)
                            sessionStorage.setItem('addProductList',JSON.stringify(addProductList));
                        }
                    });
                }
            }
        })

        // 检车单
        $('.mui-scroll').on('tap','.validate_amend',function(){
            console.log('jaj ')
            location.href="./validate.html"
        })
        //  完成
        $('.mui-scroll').on('tap','.addCommod',function(){
            var order_id = $(this).data('id');
            var addObjGood = sessionStorage.getItem('addObjGood');
            var validate = sessionStorage.getItem('validate');
            var delGoods = sessionStorage.getItem('delGoods');
            var goodsList , sellerList , yanche;

            if(!validate){  // 如果验车单为空
                var num_vali = $(".select").length;
                console.log(num_vali);
                if(num_vali>0){
                    yanche=[]
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
                        yanche.push(vali_obj)
                    })
                }
            }else{
                yanche = JSON.parse(validate);
            }
            if(!!addObjGood){  // 当新增商品时
                sellerList = [];
                addObjGood = JSON.parse(addObjGood);
                $.each(addObjGood,function(v,i){
                    if(!!i.sellerList){
                        $.each(i.sellerList,function(k,j){
                            sellerList.push(j);
                        });
                        delete addObjGood[v].sellerList
                    }
                })
                goodsList = addObjGood;
                $.each(sellerList,function(v,k){
                    delete sellerList[v].seller_account
                })
            }       
            console.log(sellerList);
            
            $.ajax({
                url:api+'smobileSaveOrder',
                type:'post',
                headers:{'sellermobileauthkey':token},
                beforeSend:function(){
                    $('.loading').show();
                },
                data:{
                    order_id : order_id,
                    store_id : store_id,
                    goodsList : JSON.stringify(goodsList),
                    delGoods :delGoods,
                    sellerList:JSON.stringify(sellerList),
                    verifyList:JSON.stringify(yanche),
                },
                success:function(data){
                    $('.loading').hide();
                    console.log(data)
                    if(data.result){
                        sessionStorage.removeItem('delGoods');
                        sessionStorage.removeItem('addObjGood');
                        sessionStorage.removeItem('validate');
                        sessionStorage.removeItem('addProductList');
                        location.href = '../carlist.html';
                    }
                    
                }
            })
            // console.log(delGoods);
            // console.log(addObjGood);
            // console.log(goodsList);
            // console.log(sellerList);
            // console.log(store_id);
            // console.log(order_id);
        });
        
        //  取消手机返回键
        pushHistory();
        window.addEventListener('popstate', function(e) {
            location.href = '../carlist.html';
            
        }, false); 
        function pushHistory() { 
            var state = { 
                title: 'title', 
                url: '#' 
            };
            window.history.pushState(state, 'title', '#'); 
        } 
    }else{
        mui.toast('非法操作!返回首页');
        setTimeout(function(){
            sessionStorage.removeItem('delGoods')
            sessionStorage.removeItem('addObjGood')
            location.href = '/idnex.html'
        },500)
    }

})