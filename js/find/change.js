

$(function(){
    $('#shit').on('submit',function(e){
        console.log(e)
        toVaild();
        console.log($('#shit').serialize())
        e.preventDefault();

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
                        // location.href = 'index.html' ;

                    }else{
                        mui.toast(data.msg)
                    }
                },
            })
        }
    }

})