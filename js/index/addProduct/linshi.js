$(function(){
    var addProductList = sessionStorage.getItem('addProductList');
    if(!!addProductList){
        addProductList= JSON.parse(addProductList);
        var fuwuObj = addProductList.data.goodsList; // 原本的商品列表

        var prevObj = sessionStorage.getItem('addObjGood'); // 公用一个session
        var linshiArr = []; //存放所有临时添加的商品 不止一个;
        if(prevObj){
            linshiArr=JSON.parse(prevObj);
        }


        $('.addCommod').on('tap',function(){
            var thats = $(this);
            var shopname = $('.shopname').val();    //商品名称
            var shopPrice = $('.shopPrice').val();  //商品入库价格
            var onePrice = $('.onePrice').val();  //商品单价
            var type_num = $('.temp_num').val();   // 商品数量
            var temporary_write = $('.temporary_write').val();   // 商品详情
            var linshiObj = {}; //存放当前的临时商品的信息
            if(!shopname || !shopPrice){
                mui.toast('名称与价格不能为空');
            }else if(!type_num || type_num==0){
                mui.toast('数量不能为空或0');
            }else{
                linshiObj = {goods_id:'',goods_name:shopname,selling_price:onePrice,bag_price:shopPrice,real_price:onePrice,shopNum:type_num,goods_info:temporary_write,is_specification:'',
                            is_goods_brand:'',is_goods_model:'',is_goods_name:'',is_goods_unit:'',is_selling_price:'',is_virtual:2};
                linshiArr.push(linshiObj);
                sessionStorage.setItem('addObjGood',JSON.stringify(linshiArr));
                fuwuObj.push(linshiObj);
                addProductList.data.goodsList = fuwuObj
                sessionStorage.setItem('addProductList',JSON.stringify(addProductList));
                location.href = './addproduct.html';

            }
        })
    }else{
        location.href = "/index.html"
    }
})