$(function(){
    //刚进来时点击添加商品
    var carObj = sessionStorage.getItem('carObj');
    var user_id ,cart_id;
    if(carObj){
        carObj = JSON.parse(carObj);
        user_id = carObj.userid;
        cart_id = carObj.cartid;
        user_name = carObj.carMan;
        console.log(carObj);
        var arr = [carObj.carName,carObj.carMan,carObj.nav_iphone];
        console.log(arr)
        $('.tosuit_num').each(function(v,i){
            
            $(this).val(arr[v])
        })
    }else{
        mui.toast('未获得车主信息')
        location.href='/index.html';
    }
    $('.tosuit_num').each(function(v,i){
        console.log($(this).val())
        if($(this).val()==''){
            $(this).parents('.tosuit_content ').hide()
        }
    })
    $('.billing_one .picking_btn').on('tap',function(){
        var id = $(this).data('id');
        var user_Carname = $(".user_Carname").val();
        if(!user_Carname){
            user_Carname = user_name;
        }
        carObj.carMan = user_Carname;
        sessionStorage.setItem('carObj',JSON.stringify(carObj))
        console.log(id)
        if(id==1){
            //服务商品
            location.href = "./shangpin/commodity.html"
        }else if(id==2){
            //服务商品
            location.href = "./shangpin/entity.html"
        }else if(id==3){
            //服务商品
            location.href = "./shangpin/temporary.html"
        }
    })


    //点击删除 tosuit_main
    //服务商品删除
    // function removeArr(arr,goods_id){
    //     var newArr =[];
    //     $.each(arr,function(v,i){
    //         console.log(i);
            
    //         if(goods_id == i.goods_id){
    //             mui.toast('zhaodoa ')
    //             console.log(v);
    //             arr.splice(v,1)
    //         }
    //     })  
    //     return newArr;
    // }
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
    //服务商品的删除
    $('.billing_fuwu').on('tap','.icon-shanchu1',function(){
        var that = $(this).parents('.twoHeader');
        var fuwushop = sessionStorage.getItem('goodsList');
        fuwushop = JSON.parse(fuwushop);
        var fuwupeople = sessionStorage.getItem('goodsSeller');
        if(fuwupeople){
            fuwupeople = JSON.parse(fuwupeople);
        }
        var id ,goods_id;
        console.log(commObj)
        mui.confirm('真的要删除此商品么?',function(index){
            console.log(index);

            if(index.index==1){
                console.log('哈哈');
                goods_id = that.data('id');
                id = that.data('pageid');
                console.log(id+goods_id);
                fuwushop = removeArr(fuwushop,goods_id);
                commObj = removeArr(commObj,goods_id);
                fuwupeople = removeArr(fuwupeople,goods_id);
                console.log(removeArr(commObj,goods_id));
                sessionStorage.setItem('goodsList',JSON.stringify(fuwushop)); //吧删除后的goodsList重新保存到缓存
                sessionStorage.setItem('goodsSeller',JSON.stringify(fuwupeople)); //吧删除后的goodsSeller重新保存到缓存
                sessionStorage.setItem('commObj',JSON.stringify(commObj)); //吧删除后的commObj重新保存到缓存
                that.remove();
                money()
            }
        })
    })
    //实体商品删除
    $('.billing_pages').on('tap','.icon-shanchu1',function(){
        var that = $(this).parents('.twoHeader');
        var fuwushop = sessionStorage.getItem('entityArray');
        fuwushop = JSON.parse(fuwushop);
        var fuwupeople = sessionStorage.getItem('entityObjs');
        if(fuwupeople){
            fuwupeople = JSON.parse(fuwupeople);
        }
        var id ,goods_id;
        console.log(pageArray)
        mui.confirm('真的要删除此商品么?',function(index){
            console.log(index);

            if(index.index==1){
                console.log('哈哈');
                goods_id = that.data('id');
                id = that.data('pageid');
                console.log(id+goods_id);
                fuwushop = removeArr(fuwushop,goods_id);
                pageArray = removeArr(pageArray,goods_id);
                fuwupeople = removeArr(fuwupeople,goods_id);
                console.log(removeArr(pageArray,goods_id));
                sessionStorage.setItem('entityArray',JSON.stringify(fuwushop)); //吧删除后的goodsList重新保存到缓存
                sessionStorage.setItem('entityObjs',JSON.stringify(fuwupeople)); //吧删除后的goodsSeller重新保存到缓存
                sessionStorage.setItem('pageArray',JSON.stringify(pageArray)); //吧删除后的commObj重新保存到缓存
                that.remove();
                money()
            }
        })
    })
    //临时商品删除
    $('.billing_linshi').on('tap','.icon-shanchu1',function(){
        var that = $(this).parents('.twoHeader');
        mui.confirm('真的要删除此商品么?',function(index){
            console.log(index);

            if(index.index==1){
                var goods_id = that.data('pageid');
                console.log(goods_id)
                linshiArr = removeLinshi(linshiArr,goods_id);
                sessionStorage.setItem('linshiArr',JSON.stringify(linshiArr));//
                that.remove();
                money()
            }
        })
    })
    //当添加商品后 回到此页面展示商品
    var commObj = sessionStorage.getItem('commObj'); // 获取添加的服务商品
    var linshiArr = sessionStorage.getItem('linshiArr'); // 获取添加的临时商品
    var pageArray = sessionStorage.getItem('pageArray'); // 获取添加的实体商品
    if (commObj){
        commObj = JSON.parse(commObj);
        var data = {commObj:commObj}
        console.log(data);
        // 服务商品展示
        $('.billing_fuwu').html(template('tpl',data))
    }
    if(linshiArr){
        linshiArr = JSON.parse(linshiArr);
        var datas = {linshiArr:linshiArr}
        console.log(datas);
        $('.billing_linshi').html(template('tpls',datas))
        
    }
    if(pageArray){
        pageArray = JSON.parse(pageArray);
        var datapage = {pageArray:pageArray}
        // console.log(datapage.pageArray[0]);
        $('.billing_pages').html(template('tplpage',datapage))
        
    }
    money();
    function money(){
        var allPirces=0 ;
        $('.allPirce').each(function(v,i){
            var prices = parseInt($(this).text())
            allPirces+=prices
            console.log(allPirces);
        })
        $('.billing_allPrice').text("￥"+allPirces);
    }
    // $('.allPirce').each(function(v,i){
    //     var prices = parseInt($(this).text())
    //     allPirces+=prices
    //     console.log(allPirces);
    // })
    // $('.billing_allPrice').text("￥"+allPirces);
    $('.billing_footer').on('tap',function(){
        // console.log(commObj)
        // console.log(linshiArr)
        // console.log(pageArray);
        var user_Carname = $(".user_Carname").val();
        if(!user_Carname){
            user_Carname = user_name;
        }
        var obj = {user_id:user_id,cart_id:cart_id,store_id:store_id,goodsList:[],goodsSeller:[]};
        var fuwushop = sessionStorage.getItem('goodsList');
        var fuwupeople = sessionStorage.getItem('goodsSeller');
        var shitishop = sessionStorage.getItem('entityArray');
        var shitipeople = sessionStorage.getItem('entityObjs');
        var linshiPro = sessionStorage.getItem('linshiArr');
        if(fuwushop){
            fuwushop = JSON.parse(fuwushop);
            $.each(fuwushop,function(index,value){
                console.log(fuwushop[index]);
                obj.goodsList.push(fuwushop[index]);
            })
        }
        if(fuwupeople){
            fuwupeople = JSON.parse(fuwupeople);
            $.each(fuwupeople,function(index,value){
                console.log(fuwupeople[index]);
                obj.goodsSeller.push(fuwupeople[index]);
            })
        }
        if(shitishop){
            shitishop = JSON.parse(shitishop);
            $.each(shitishop,function(index,value){
                console.log(shitishop[index]);
                obj.goodsList.push(shitishop[index]);
            })
        }
        if(shitipeople){
            shitipeople = JSON.parse(shitipeople);
            $.each(shitipeople,function(index,value){
                obj.goodsSeller.push(shitipeople[index]);
            })
        }
        if(linshiPro){
            linshiPro = JSON.parse(linshiPro);
            $.each(linshiPro,function(index,value){
                obj.goodsList.push(linshiPro[index]);
            })
        }
        if(obj.goodsList<=0){
            mui.toast('请至少添加一种商品')
            return false;
        }
        var baba = JSON.stringify(obj.goodsList)
        var mama = JSON.stringify(obj.goodsSeller)
        // console.log(baba)
        // console.log(mama)
        var textarea = $("#textarea").val();
        console.log(textarea)
        var verifyList = localStorage.getItem('validate');

        $.ajax({
            url:api+'smobileOrderSaveGoods',
            type:'post',
            headers:{'sellermobileauthkey':token},
            data:{
                cart_id:obj.cart_id,
                store_id:obj.store_id,
                user_id:obj.user_id,
                user_name:user_Carname,
                goodsList:baba,
                goodsSeller:mama,
                remarks:textarea,
                verifyList:verifyList
            },
            success:function(data){
                console.log(data)
                if(data.result){
                    console.log(obj)
                    sessionStorage.setItem('AllObj',JSON.stringify(obj))
                    mui.alert(data.msg,function(){
                        sessionStorage.removeItem('goodsSeller')
                        sessionStorage.removeItem('goodsList')
                        sessionStorage.removeItem('commObj')
                        sessionStorage.removeItem('linshiArr')
                        sessionStorage.removeItem('pageArray')
                        sessionStorage.removeItem('entityArray')
                        sessionStorage.removeItem('entityObjs')
                        sessionStorage.removeItem('carObj')
                        localStorage.removeItem('validate')
                        var myDate = new Date();
                        var year = myDate.getFullYear();  //年
                        var mon = myDate.getMonth()+1;  //月
                        var day = myDate.getDate();    //日
                        mon>=10? mon=mon:mon='0'+mon;
                        day>=10? day=day:day='0'+day;
                        var newTime = year+'-'+mon+'-'+day;
                        console.log(newTime);
                        var ggOmg = {id:1,text:"接车单",newTime:newTime};
                        sessionStorage.setItem('carlistObj',JSON.stringify(ggOmg))
                        location.href = "/index/carlist.html"
                    })
                }
            }
        })

    })
})