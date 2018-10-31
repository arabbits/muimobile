



// $(function(){
//     //手机号码验证
//     function Number(theObj) {
//         var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;  
//         if (reg.test(theObj)) {
//           return true;
//         }
//         return false;
//     }


//     $('.loginBtn').on('tap',function(){
//         var iphone = $('#iphone').val();
//         var password = $('#password').val();
//         console.log(iphone,password);
//         if(!iphone||!password){
//             mui.alert('手机号或密码不能为空')
//         }else if(!Number(iphone)){
//             mui.alert('您输入的手机号不合法')
//         }else if(password.length<6){
//             mui.alert('密码不小于6位数')
            
//         }else{
            
//             $.ajax({
//                 url:'http://api.carlub.com.cn/smobilelogin',
//                 type:'post',
//                 data:{
//                     seller_account : iphone,
//                     password : password
//                 },
//                 // headers:{"userauthkey":token},
//                 success:function(data){
//                     console.log(data);
//                     if(data.result){
                        
//                         var token = data.data.sellermobileauthkey;
//                         var store_id = data.data.info.store_id;
//                         var seller_id = data.data.info.seller_id;
//                         var is_boss = data.data.info.is_boss;
//                         var name = data.data.info.seller_account;
//                         var phone = data.data.info.seller_phone;
                        
//                         // var user_id = data.data.info.seller_id;
//                         // var user_id = data.data.info.user_id;
//                         // var userObj = {token:token};
//                         // userObj = JSON.stringify(userObj);
//                         var userObj ={token:token,store_id:store_id,seller_id:seller_id,is_boss:is_boss,name:name,phone:phone};
//                         localStorage.setItem('userObj',JSON.stringify(userObj));

//                         console.log(userObj);
//                         location.href = 'index.html' ;

//                     }else{
//                         mui.toast(data.msg)
//                     }
//                 },
//             })
//         }
//     })
// })

$(function(){
    $('#shit').on('submit',function(e){
        console.log(e)
        e.preventDefault();
        toVaild();
        // console.log($('#shit').serialize())

        // mui.toast('哈哈')
    });
    function toVaild(){
        var phone = $('#iphone').val();
        var password = $('#password').val();
        // console.log(phone);
        // console.log(password);
        if(!phone || !password){
            mui.alert('请将信息输入完整')
            return false;
        }else{
            $.ajax({
                url:'http://api.carlub.com.cn/smobilelogin',
                type:'post',
                data:{
                    seller_account : phone,
                    password : password
                },
                // headers:{"userauthkey":token},
                success:function(data){
                    console.log(data);
                    if(data.result){
                        
                        var token = data.data.sellermobileauthkey;
                        var store_id = data.data.info.store_id;
                        var seller_id = data.data.info.seller_id;
                        var is_boss = data.data.info.is_boss;
                        var name = data.data.info.seller_account;
                        var phone = data.data.info.seller_phone;
                        
                        // var user_id = data.data.info.seller_id;
                        // var user_id = data.data.info.user_id;
                        // var userObj = {token:token};
                        // userObj = JSON.stringify(userObj);
                        var userObj ={token:token,store_id:store_id,seller_id:seller_id,is_boss:is_boss,name:name,phone:phone};
                        localStorage.setItem('userObj',JSON.stringify(userObj));

                        console.log(userObj);
                        location.href = 'index.html' ;

                    }else{
                        mui.toast(data.msg)
                    }
                },
            })
        }
    }

})