


$(function(){
    $('.message_div').on('tap',function(){
        mui.confirm('确定退出登录?','提示',['取消','退出'],function(index){
            if(index.index==1){
                mui.toast('退出成功')
                setTimeout(function(){
                    localStorage.clear();
                    sessionStorage.clear();
                    location.href = "../login.html"
                },500)
            }
        })
    })

    $('.cheSuper').on('tap',function(){
        var id = $(this).data('id');
        if(id == 1){
            mui.toast('退出成功')
            location.href="./change.html"
        }
    })
})