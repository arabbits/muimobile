$(function(){
    // var token = localStorage.getItem('token');
    // console.log(token)
    
    if(!token){
        mui.alert('您未登录',function(){
            location.href = "./login.html"

        })
    }else{
        console.log(is_boss)
        if(is_boss!=1){
            $('.boss_show').hide();
            $('.soMoney').hide();
        }
        $.ajax({
            url:api+"smobileTree",
            type:"get",
            headers:{"sellermobileauthkey":token},
            beforeSend:function(){
                $('.loading').show()
            },
            success:function(data){
                $('.loading').hide();
                console.log(data);
                console.log(data.data[0]);
                if(data.result){
                    data
                    $('.index_main').html(template('tpl',data.data[0]))
                }
            }
        })
        $.ajax({
            url:api+"smobileTodayData",
            type:"post",
            headers:{"sellermobileauthkey":token},
            beforeSend:function(){
                $('.loading').show()
            },
            data:{
                store_id:store_id
            },
            success:function(data){
                $('.loading').hide();
                $('.mui-scroll').show();
                if(data.result){
                    $('.numCar').text(data.data.todayUser+"辆")
                    $('.numPrice').text("￥"+data.data.todayPrice)
                    $('.number').text(data.data.cardNum+"次")
                    $('.numVip').text("￥"+data.data.clubPrice)
                }
                if(data.code ==1001){
                    mui.alert(data.error,function(){
                        localStorage.removeItem('userObj');
                        location.href="/login.html"
                    })
                }
            }
        })
        $('.noflex').on('tap',function(){
            console.log('jj')
            // location.href = './index/billing.html' 开单
            location.href = './index/pickSingle.html'
        })
    
        $('.search').on('focus',function(){
            $(this).css('padding-left','2rem').attr('placeholder','')
        })
        $('.search').on('blur',function(){
            // console.log('hah ')
            if(!$(this).val()){
                $(this).css('padding-left','3.5rem').attr('placeholder','请输入客户名进行查询')
            }
        })
    
        // $('.mainGo').on('tap',function(){
        //     var id = $(this).data('id');
        //     var text = $(this).find('span').text();
        //     var myDate = new Date();
        //     var year = myDate.getFullYear();  //年
        //     var mon = myDate.getMonth()+1;  //月
        //     var day = myDate.getDate();    //日
        //     mon>=10? mon=mon:mon='0'+mon;
        //     day>=10? day=day:day='0'+day;
        //     var newTime = year+'-'+mon+'-'+day;
        //     console.log(newTime);
        //     var carlistObj = {id:id,text:text,newTime:newTime};
        //     sessionStorage.setItem('carlistObj',JSON.stringify(carlistObj));
        //     // console.log(text)
        //     if(id==1){
        //         location.href='./index/carlist.html';  //开单
        //     }else if(id==2){
        //         location.href='./index/carlist.html'; 
                
        //         // location.href='./index/tosuit.html' //领料
        //     }else if(id==3){
        //         location.href='./index/carlist.html'; 
        //         // mui.toast(text)
        //         // location.href='./index/shigongdan.html'
        //     }else if(id==4){
        //         location.href='./index/carlist.html';  //施工
        //         // mui.toast(text)
        //         // location.href='./index/complete.html' //完工单
        //     }else if(id==5){
        //         location.href='./index/pay.html' // 结算
        //         // location.href='./index/gathering.html' // 结算
        //     }else if(id==6){
        //         location.href='./index/incar.html'
        //     }else if(id==7){
        //         // 营业额
        //         location.href='./index/yingye/today.html'
        //     }else if(id==8){
        //         location.href='./index/yingye/zero.html'
        //     }else if(id==9){
        //         // 营业额
        //         location.href='./index/yingye/lirun.html'
        //     }else if(id==10){
        //         // 营业额
        //         location.href='./index/yingye/shoukuan.html'
        //     }else if(id==11){
        //          // 优惠金额
        //         location.href='./index/yingye/youhui.html'
        //     }else if(id==12){
        //         // 客户数据分析
        //         location.href='./index/yingye/client.html'
        //     }else if(id==13){
        //         // 月度利润
        //         location.href='./index/yingye/monthly.html'
        //     }else if(id==14){
        //         // 月度利润
        //         location.href='./index/yingye/temporary.html'
        //     }
        // })
        $('.index_main').on('tap','.mainGo',function(){
            var id = $(this).data('id');
            var text = $(this).find('span').text().trim();
            var myDate = new Date();
            var year = myDate.getFullYear();  //年
            var mon = myDate.getMonth()+1;  //月
            var day = myDate.getDate();    //日
            mon>=10? mon=mon:mon='0'+mon;
            day>=10? day=day:day='0'+day;
            var newTime = year+'-'+mon+'-'+day;
            console.log(newTime);
            console.log(text);
            var carlistObj = {id:id,text:text,newTime:newTime};
            sessionStorage.setItem('carlistObj',JSON.stringify(carlistObj));
            // console.log(text)
            if(text=='接车单'){
                location.href='./index/carlist.html';  //开单
            }else if(text=='领料单'){
                location.href='./index/carlist.html'; 
            }else if(text=='施工单'){
                location.href='./index/carlist.html'; 
            }else if(text=='收款'){
                location.href='./index/pay.html' // 结算
            }else if(text=='日营业额'){
                location.href='./index/yingye/today.html'
            }else if(text=='临时支出'){
                location.href='./index/yingye/zero.html'
            }else if(text=='利润统计'){
                location.href='./index/yingye/lirun.html'
            }else if(text=='应收款统计'){
                location.href='./index/yingye/shoukuan.html'
            }else if(text=='优惠金额'){
                location.href='./index/yingye/youhui.html'
            }else if(text=='客户数据'){
                location.href='./index/yingye/client.html'
            }else if(text=='月度利润'){
                location.href='./index/yingye/monthly.html'
            }else if(text=='临时商品'){
                location.href='./index/yingye/temporary.html'
            }
        })

        //点击总车辆
        $('.headr_first').on('tap',function(){

            var id = $(this).data('id');
            console.log(id)
            if(id==1){
                //  总车辆
                location.href = "./index/carnum/allCar.html"
            }
        })

        $('body').on('tap','.footer_mains',function(){
            console.log('解决')
            $(this).addClass('che_color').siblings().removeClass('che_color');
            var shitid = $(this).data('id');
            // var data;
            if(shitid == 1){
                location.href="./index.html"
            }else if(shitid ==2 ){
                location.href="./faxian.html"
            }
        })
    }
    

})
