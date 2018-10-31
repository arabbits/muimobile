$(function(){
    // 点击数量框时控制数字的显隐
    // $('.temp_num').on('focus',function(){
    //     console.log('hah ')
    //     $('.type_num').hide()
    // })
    // 

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


    
    //点击添加人  暂时不要

    // var options='<option value="-2">请选择</option>' ;
    // $.ajax({
    //     url:api+'smobileOrderPeopleList',
    //     type:'post',
    //     headers:{'sellermobileauthkey':token},
    //     data:{
    //         store_id: store_id,
    //     },
    //     success:function(data){
    //         console.log(data);
    //         if(data.result){
    //             // var length = res.data.length;
    //             // $('.tixing_nums').text('('+length+')')
    //             // $('.mui-scroll').html(template('tpl',data));
    //             // $('.che_footer').show();
    //             var datashut = data.data;
    //             console.log(datashut);
    //             // datashut.each(function(v,i){
    //             //     console.log(v)
    //             //     console.log(i)
    //             // })
    //             for(var i=0;i<datashut.length;i++){
    //                 // console.log(datashut[i].seller_account);
    //                 // console.log(datashut[i].seller_id);
    //                 // 拼写option
    //                 options +='<option value="'+datashut[i].seller_id+'" data-id="'+datashut[i].seller_id+'">'+datashut[i].seller_account+'</option>';
    //                 // console.log(options)
    //             }
    //             console.log(options)
    //             $('.picking_btn').on('tap',function(){
    //                 var that = $(this);
    //                 var valus = that.parent().parent().find('.commodity_addman').length;
    //                 var valText =[];
    //                 console.log(valus);
    //                 if(valus>0){
                        
    //                     that.parent().parent().find('.commodity_addman').each(function(v,i){
    //                         console.log(v+'个');
    //                         valText[v] = $(this).find('#selects').val();
    //                     })
    //                     if(valText.indexOf("-2")>-1){
                            
    //                         console.log(valText);
    //                         mui.toast('请先选择人员!')
    //                     }else{
    //                         that.parent().parent().append(`<div class="commodity_addman" data-id="1">
    //                             <span class="iconfont icon-guanbi" ></span>
    //                             <select name="" id="selects">`
    //                                 +options+
    //                             `</select>
    //                         </div>`)

    //                     }
    //                 }else{
    //                     that.parent().parent().append(`<div class="commodity_addman" data-id="1">
    //                         <span class="iconfont icon-guanbi" ></span>
    //                         <select name="" id="selects">`
    //                             +options+
    //                         `</select>
    //                     </div>`)
    //                 }
            
    //             });
    //             // that.parent().parent().append(`<div class="commodity_addman" data-id="1">
    //             //     <span class="iconfont icon-guanbi" ></span>

    //             //     <select name="" id="selects">`
    //             //     +options+
    //             //     `</select>
    //             // </div>`)
    //         }else{
    //             mui.toast('暂无数据')
    //         }
             
    //     }
    // });
    // //点击删除
    // $('.mui-scroll').on('tap','.icon-guanbi',function(){
    //     // console.log('呵呵')
        
    //     $(this).parent().remove();
    // })
    var prevObj = sessionStorage.getItem('linshiArr');
    var linshiArr = []; //存放所有临时添加的商品 不止一个;
    if(prevObj){
        linshiArr=JSON.parse(prevObj);
    }
    console.log(linshiArr);
    
        $('.addCommod').on('tap',function(){
            var thats = $(this);
            var shopname = $('.shopname').val();    //商品名称
            var shopPrice = $('.shopPrice').val();  //商品入库价格
            var onePrice = $('.onePrice').val();  //商品单价
            var type_num = $('.temp_num').val();   // 商品数量
            var temporary_write = $('.temporary_write').val();   // 商品详情
            // type_num = type_num.split('x ');
            // type_num = type_num[1]; //去除x
            // console.log(type_num)
            // var shopTeacher = []; //存放技师的id;
            // var shopTeachersName = []; //存放技师的名字;
            console.log(type_num)
            var linshiObj = {}; //存放当前的临时商品的信息
            if(!shopname || !shopPrice){
                mui.toast('名称与价格不能为空');
            }else if(!type_num || type_num==0){
                mui.toast('数量不能为空或0');
            }else{
                linshiObj = {goods_id:'',goods_name:shopname,selling_price:onePrice,bag_price:shopPrice,real_price:onePrice,shopNum:type_num,goods_info:temporary_write,is_specification:'',
                            is_goods_brand:'',is_goods_model:'',is_goods_name:'',is_goods_unit:'',is_selling_price:'',is_virtual:2};
                linshiArr.push(linshiObj);
                console.log(linshiArr);
                sessionStorage.setItem('linshiArr',JSON.stringify(linshiArr));
                location.href = '../billing.html';
                // history.go(-1);
                

                // var  selects = thats.parents('.commodity_main').find('.commodity_addman').length;
                // console.log(selects)
                
                // if(selects<=0){
                //     mui.toast('请添加技师');
                // }else{
                    // thats.parents('.commodity_main').find('.commodity_addman').each(function(v,i){
                    //     shopTeacher[v] = $(this).find('#selects').val();
                    //     var options=$(this).find('#selects option:selected').text();; //获取选中的项
                    //     shopTeachersName[v] = options;                   
                    //     console.log(v)
                        
                    // });
                    // console.log(shopTeacher)
                    // if(shopTeacher.indexOf('-2')>-1){
                    //     mui.toast('请选择技师');
                    // }else{
                        // linshiObj.shopTeacher = shopTeacher; //存入技师的id;
                        // linshiObj.shopTeachersName = shopTeachersName; //存入技师的名字;
                    //     linshiArr.push(linshiObj);
                    //     console.log(linshiArr);
                    //     sessionStorage.setItem('linshiArr',JSON.stringify(linshiArr));
                    //     location.href = '../billing.html';
                    // }
                // }
            }
        })
    
})