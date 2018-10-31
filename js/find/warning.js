

$(function(){
    var page = 1;
    var user_name ,cart_licens,obd_id,is_know;
    
    loadPage(page)
    function loadPage(page,user_name,cart_licens,obd_id){
        $.ajax({
            url:api+"smobileListWarn",
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
                $('.loading').show()
            },
            data:{
                page:page,
                limit:10,
                'key[user_name]': user_name,
                'key[cart_licens]': cart_licens,
                'key[obd_id]': obd_id,
                'key[is_know]':is_know ,
            },
            success:function(data){
                $('.loading').hide()
                console.log(data)
                $('.che_main').show();
                if(data.result){
                    $('.break_twins').html(template('tpl',data))
                    spanPage = Math.ceil(data.count / 10);
                    $(".onePage").html(render(spanPage, page));
                    $('.pages ').show();
                    
                }else{
                    mui.toast(data.msg)
                    $(".break_twins").html(`<div class="che_display noHave">
                    <span>暂无数据</span>
                    </div> `);
                $('.pages ').hide();
                }
                if(data.data.length<=0){
                    // $('.volist').show();
                }
            }
        })
    }

    // 渲染页数
    function render(spanPage, page) {
      var spanHtml = "";
      for (var i = 1; i <= spanPage; i++) {
        if (i == 2 && page - 2 > 1) {
          i = page - 2;
        } else if (i == page + 2 && page + 2 < spanPage) {
          i = spanPage - 1;
        } else {
            // console.log(i); 
          if (i == page) {
            spanHtml += `<span class="page_color page_son">` + i + `</span>`;
          } else {
            spanHtml += `<span class="page_son">` + i + `</span>`;
          }
        }
      }
      // console.log(page);
      return spanHtml;
      // $(".page_pages").html(spanHtml);
    } 
    // 点击数字  变幻页数
    $(".page_pages").on("tap", ".page_son", function() {
        var that = $(this);
        var dataId = that.parent().data('id');
        console.log(dataId)
        page = that.text();
        page = page*1;
        loadPage(page,user_name,cart_licens,obd_id);
    });
    
    // 增加页数
    $(".mui-icon-arrowright").on("tap", function() {
        var addnum = $(".page_color").text();
        $(".page_son").each(function(v, i) {
          var thisNum = $(this).text();
          if (addnum < thisNum) {
            page++; //page
            loadPage(page,user_name,cart_licens,obd_id);
            return false;
          }
        });
    });
      // 减少页数
    $(".mui-icon-arrowleft").on("tap", function() {
        var dataId = $(this).data('id');
        var jianNum ;
        console.log(page);
        jianNum = $(".onePage").find(".page_color").text();
        $(".onePage .page_son").each(function(v, i) {
            var thisNum = $(this).text();
            if (jianNum > thisNum) {
            page--; //page
            loadPage(page,user_name,cart_licens,obd_id);
            return false;
            }
        });
    });
    // 直接跳转页数
    $(".page_input .btns").on("tap", function() {
        var dataId = $(this).data('id');
        console.log(dataId);
        var pagesNum;
        if(dataId==1){
          pagesNum = $(".onePagenum").val()
          pagesNum = pagesNum*1;
          var jianNum =  $(".onePage").find(".page_color").text();
          var leng = [];
          $(".onePage .page_son").each(function(v,i){
            var number = $(this).text()*1;
            leng.push(number);
          })
          var lengths = Math.max.apply(Math,leng);
          console.log(lengths);  
          console.log(pagesNum);  
          if (pagesNum != jianNum && pagesNum > 0 && pagesNum) {
            pagesNum > lengths ? (pagesNum = lengths) : (pagesNum = pagesNum);
            page = pagesNum;
            loadPage(page,user_name,cart_licens,obd_id);
            // console.log("刷新");
          }
        }
    });
    // 查找
    $('.break_button').on('tap',function(){
        user_name = $('.user_name').val(); // 车主名称
        cart_licens = $('.car_cline').val(); // 车牌
        obd_id = $('.input_id').val();       // obd id
        // mui.toast('姐姐');
        console.log(user_name)
        console.log(cart_licens)
        console.log(obd_id)
        page=1
        loadPage(page,user_name,cart_licens,obd_id);
        
    })
    //点击展开全部信息
    $('.break_twins ').on('tap','span',function(){
        $(this).toggleClass('show_dots');
    })
    // 处理
    $('.break_twins ').on('tap','.clickTroub',function(){
        var warn_id = $(this).data('id')
        mui.confirm('确定将该故障设为已知晓吗?','提示',['未知晓','已知晓'],function(index){
            if(index.index==1){
                console.log(warn_id);
                $.ajax({
                    url:api+"smobileIsDispose",
                    type:'post',
                    headers:{'sellermobileauthkey':token},
                    beforeSend:function(){
                        $('.loading').show()
                    },
                    data:{
                        warn_id:warn_id
                    },
                    success:function(data){
                        $('.loading').hide()
                        console.log(data)
                        if(data.result){
                            loadPage(page,user_name,cart_licens,obd_id);
                        }else{
                            mui.toast(data.msg)
                        }
                    }
                })
            }
        })
    })


})