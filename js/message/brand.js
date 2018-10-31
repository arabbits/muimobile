 
  
// mui.init();
// 
var userObj = localStorage.getItem('userObj')
userObj = JSON.parse(userObj);
var token = userObj.token;
var api = 'http://api.carlub.com.cn/';

var mask = mui.createMask(function(){
    // mui('.mui-off-canvas-wrap').offCanvas().close();
    $('.mui-off-canvas-right').removeClass('mui-active').css('transform','translate3d(350px, 0px, 0px)')
    
});//callback为用户点击蒙版时自动执行的回调；

$(function(){
    // var father = $('.mui-table-view')
    $.ajax({
        url:api+'smobileIpLocation',
        type:'post',
        headers:{'sellermobileauthkey':token},
        success:function(data){
          console.log(data);
          $('.shangHai').text(data.data);
        }
      })
    $.ajax({
        url:api+'smobileSearchCar',
        headers:{'sellermobileauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        type:'post',
        data:{id:0,type_id:1},
        success:function(data){
            console.log(data);

            if(data.result){
                $('.loading').hide();
                $('.che_main').show();
                
                $('#repl').html(template('tpl',data));
                mui.init();
                mui.ready(function() {
                    var header = document.querySelector('header.mui-bar');
                    var list = document.getElementById('list');
                    list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
                    window.indexedList = new mui.IndexedList(list);
                });
                //滑动时生效

                var replHeight = $('#repl').height();
                console.log(replHeight)
            }else{
                mui.toast(data.msg);
            }
           
        }
    })

    //点击时获取车子品牌与型号
    $('#repl').on('tap','.mui-table-view-cell',function(){
        // 侧滑菜单的子选项
        // $('.mui-off-canvas-right').addClass('shows')
        // mask.show()
        var ids = $(this).data('id');
        var type_id = $(this).data('typeid');
        var test = $(this).text();
        // var text 
        // console.log(test)
        mui('#caidan1').scroll({indicators: false}).scrollTo(0,0,100)
    
        $.ajax({
            url:api+'smobileSearchCar',
            type:'post',
            headers:{'sellermobileauthkey':token},
            data:{id :ids,type_id:type_id},
            success:function(info){
                console.log(info)
                $('#aside').html(template('tpltwo',info));
                $('.mui-off-canvas-right').addClass('mui-transitioning').css({'visibility':'visible','transform':'translate3d(0px, 0px, 0px);'});
                mask.show()
                $('#aside').on('tap','.asideClick',function(){
                    that = $(this);
                    var text = test+that.text(); 
                    var id = that.data('id')
                    
                    // var pro = text+$(this).text();
                    console.log(text);
                    console.log(id);
                    sessionStorage.setItem('test',text)
                    sessionStorage.setItem('ID',id)
                    // location.href = "carstyle.html?name="+text+"&id="+id;
                    location.href = "carstyle.html" 
                })
            }
        })

    })
    // 禁止左右滑出策划菜单
    $('.mui-inner-wrap').on('drag', function(event) {
        event.stopPropagation();
    });

})
