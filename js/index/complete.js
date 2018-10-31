$(function(){
    $('.complete_pro').on('tap',function(){
        console.log('哈哈')
        // $(this).find('.iconfont').css('transform','rotate(180deg)')
        $(this).find('.iconfont').toggleClass('trans');
        $('.tosuit_bottom').toggle();
        // $('.tosuit_bottom').hide();
        
        // zepto不支持滑动效果
        // $('.tosuit_bottom').slideToggle();
    })
})