
$(function(){
    $('.search').on('focus',function(){
        $(this).css('padding-left','2.2rem').attr('placeholder','')
    })
    $('.search').on('blur',function(){
        // console.log('hah ')
        if(!$(this).val()){
            $(this).css('padding-left','6.5rem').attr('placeholder','输入车牌号码')
        }
    })
})