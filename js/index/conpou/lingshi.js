$(function(){

    // $('.temp_num').on('input',function(){
    //     var text = $(this).val();
    //     if(!text){
    //         text=0;
    //         $('.type_num').show().text('x '+text);
    //         $(this).attr('placeholder','输入商品数量')
    //     }else{
    //         $('.type_num').show().text('x '+text);
    //         // var text = $(this).val('');
    //         $(this).attr('placeholder',' ')
    //     }
        
    // });
    // $('.temp_num').on('blur',function(){
    //     var text = $(this).val('');
    // });
    var prevObj = sessionStorage.getItem('couponLingshi');
    var GoodsList = sessionStorage.getItem('GoodsList'); //传递值的
    var shitID = sessionStorage.getItem('shitID'); //分别哪个的id
    // var pageFuckArr = sessionStorage.getItem('couponId');
    var linshiArr = []; //存放所有临时添加的商品 不止一个;
    var funckObj = {};
    console.log(JSON.parse(prevObj));
    
    if(prevObj){
        prevObj=JSON.parse(prevObj);
        console.log(prevObj[shitID])

        $.each(prevObj,function(v,i){
            // console.log(i);
            linshiArr.push(v)
        })
        funckObj= prevObj;
        if(linshiArr.indexOf(shitID)>-1){
            // console.log('才');
        }else{
            funckObj[shitID] = [];
        }
        console.log(linshiArr);
        
    }else{
        funckObj[shitID] = [];
        console.log('fucj')
    }
    if(GoodsList){
        GoodsList = JSON.parse(GoodsList);
    }else{
        GoodsList = [];
    }
    console.log(funckObj);
    
        $('.addCommod').on('tap',function(){
            var thats = $(this);
            var shopname = $('.shopname').val();    //商品名称
            var shopPrice = $('.shopPrice').val();  //商品价格
            var type_num = $('.temp_num').val();   // 商品数量
            var temporary_write = $('.temporary_write').val();   // 商品详情
            // console.log(type_num)
            // var shopTeacher = []; //存放技师的id;
            // var shopTeachersName = []; //存放技师的名字;
            var linshiObj = {}; //存放当前的临时商品的信息
            if(!shopname || !shopname){
                mui.toast('名称与价格不能为空');
            }else if(type_num==0 || !type_num){
                mui.toast('数量不能为0');
            }else{
                linshiObj = {goods_id:'',goods_name:shopname,selling_price:shopPrice,real_price:shopPrice,shopNum:type_num,goods_info:temporary_write,is_specification:'',
                            is_goods_brand:'',is_goods_model:'',is_goods_name:'',is_goods_unit:'',is_selling_price:'',is_virtual:2};
                GoodsObj = {goods_id:'',goods_name:shopname,bag_price:shopPrice,is_virtual:2,goods_info:temporary_write,shopNum:type_num,coupons_id:shitID,selling_price:0,real_price:shopPrice};
                funckObj[shitID].push(linshiObj); //页面渲染
                GoodsList.push(GoodsObj); //页面传值
                console.log(GoodsList);
                sessionStorage.setItem('couponLingshi',JSON.stringify(funckObj));
                sessionStorage.setItem('GoodsList',JSON.stringify(GoodsList));
                location.href = '../couponList.html';
                // history.go(-1);
                

            }
        })
    
})