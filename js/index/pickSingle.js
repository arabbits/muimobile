$(function(){



    $('.pick_img').on('tap',function(){
        var id = $(this).data('id');
        console.log(id)
        if(id==1){
            location.href="./manual.html"
        }else if(id==2){
            location.href="./automate.html"
            // mui.toast('自动识别功能正在维护中')
            
        }
    })
})