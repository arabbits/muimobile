$(function(){
    var addProductList = sessionStorage.getItem('addProductList');
    if(!!addProductList){
        addProductList = JSON.parse(addProductList);
        console.log(addProductList);
        $('.validate_All').html(template('validate',addProductList))
        
        console.log($('.select').length);
        
        $('.validate_All').on('tap','.val_bgc',function(){
            $(this).removeClass('val_bgc').addClass("select").siblings().addClass('val_bgc').removeClass("select");
            console.log($(this).data('id'));
        })
        $('.reception_message').on('tap',function(){
            var num_vali = $(".select").length;
            var validate = [];
            //  var validate = {verify:[]};
            if(num_vali>0){
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
                    validate.push(vali_obj)
                })
                sessionStorage.setItem("validate",JSON.stringify(validate));
                location.href = './addproduct.html';
                
            }else{
                mui.confirm('确定不添加检车单么?',function(index){
                    if(index.index==1){
                        location.href = './addproduct.html';
                    }
                });

                
            }
        })

    }else{
        mui.toast('非法操作!返回首页');
        setTimeout(function(){
            sessionStorage.removeItem('delGoods')
            sessionStorage.removeItem('addObjGood')
            location.href = '/idnex.html'
        },500)
    }
})