$(function() {
    var page = 1;
    var pageTwo = 1;
    var keyTime,goods_name;
    var spanPage = 1; //全局
    var nextPage = 1; // 第二个表的page
    var navation = window.navigator.userAgent;
    console.log(navation)
    $.ajax({
      url: api + "smobileTemporaryGoods",
      type: "post",
      headers: { sellermobileauthkey: token },
      beforeSend: function() {
        $(".loading").show();
      },
      data: {
        page: page,
        limit: 6
      },
      success: function(data) {
        $(".loading").hide();
        $(".che_main").show();
        console.log(data);
        if (data.result) {
            spanPage = Math.ceil(data.count / 6);
          $(".onePage").html(render(spanPage, page));
          // echarts 准备代码
          if (data.length == 0) {
            $(".drive_main").hide();
          }else{
            var pastDate = data.data;
            var title = '总数量'; // 标题
            var seriesData = []; // 营业额度 y轴
            var xAxisData = [];  // 时间 x轴
            $.each(pastDate,function(v,i){
                // seriesData.push(Math.ceil(i.allPrice));  
                seriesData.push(i.goods_number*1);
                xAxisData.push(i.goods_name); // X轴
            })
            echart5(title, seriesData, xAxisData);
          } 
          $('.page_twoNum').text(data.count);
          $('.day_start').val(data.start_time)
          $('.day_end').val(data.end_time)
          $(".todayMoney").html(template("tpl", data));
        } else {
          mui.toast(data.msg);
          
        } 
        if (data.data.length == 0) {
          $(".todayMoney").append(`<div class="che_display noHave">
                  <span>暂无数据</span>
              </div> `);
          $('.shitsOne').hide();
          $(".eachres").hide();
        }else{
          $('.shitsOne').show();
          $(".eachres").show();
        }
      }
    });
    // 搜索时加载
    function createFragment(keyTime, page,goods_name) {
        $.ajax({
            url: api + "smobileTemporaryGoods",
            type: "post",
            headers: { sellermobileauthkey: token },
            beforeSend: function() {
              $(".loading").show();
            },
            data: {
              page: page,
              limit: 6,
              'key[time]':keyTime,
              'key[goods_name]':goods_name,
            },
            success: function(data) {
              $(".loading").hide();
              $(".che_main").show();
              console.log(data);
              if (data.result) {
                spanPage = Math.ceil(data.count / 6);
                // console.log(render(spanPage, page)); // 渲染page
                $(".onePage").html(render(spanPage, page));
                // echarts 准备代码
                if (data.length == 0) {
                  $(".drive_main").hide();
                }else{
                  $('.eachres').show();
                  
                  var pastDate = data.data;
                  var title = '总数量'; // 标题
                  var seriesData = []; // 营业额度 y轴
                  var xAxisData = [];  // 时间 x轴
                  $.each(pastDate,function(v,i){
                    seriesData.push(i.goods_number*1);
                    xAxisData.push(i.goods_name); // X轴
                  })
                  echart5(title, seriesData, xAxisData);
                }
                $('.page_twoNum').text(data.count);
                $('.day_start').val(data.start_time);
                $('.day_end').val(data.end_time);
                $(".todayMoney").html(template("tpl", data));
              } else {
                mui.toast(data.msg);
              }
              if (data.data.length == 0) {
                $(".todayMoney").html(`<div class="che_display noHave">
                        <span>暂无数据</span>
                    </div> `);
                $('.shitsOne').hide();
                $('.eachres').hide();
              }else{
                $('.shitsOne').show();
                $('.eachres').show();
                
              }
            }
          });
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
  
    //查找
    $(".go_search").on("tap", function() {
      var start = $(".day_start").val();
      var end = $(".day_end").val();
      var names = $('.goods_name').val();
      if(names){
        goods_name = names;
      }else{
        goods_name = '';
      }
      page = 1;
      // console.log(start,end);
      if (end && start) {
        !end == true ? (end = 0) : (end = end);
        console.log(end);
        keyTime = start + "," + end;
        console.log(keyTime);
        createFragment(keyTime, page,goods_name);
      } else {
        mui.toast("请选择开始时间与结束时间!");
      }
    });
    //选择时间
    $(".timers input").on("tap", function() {
      var that = $(this);
      var year = new Date().getFullYear();
      console.log(year);
      var dtPicker = new mui.DtPicker({
        type: "date",
        beginYear: 2016,
        endYear: year
      });
      dtPicker.show(function(e) {
        that.val(e.text);
      });
    });
    // 点击选中颜色 createFragment  
    $(".page_pages").on("tap", ".page_son", function() {
      var that = $(this);
      var dataId = that.parent().data('id');
      console.log(dataId)
      if(dataId==1){
        page = that.text();
        page = page*1;
        createFragment(keyTime, page,goods_name);
      }else if(dataId==2){
        pageTwo = that.text();
        pageTwo = pageTwo*1;
        createFragment(keyTime, pageTwo,goods_name);
      }
    });
    // 增加页数
    $(".mui-icon-arrowright").on("tap", function() {
      var dataId = $(this).data('id');
      var addnum ;
      console.log(dataId);
      if(dataId==1){
        addnum = $(".onePage").find(".page_color").text();
        console.log(addnum);
        
        $(".onePage .page_son").each(function(v, i) {
          var thisNum = $(this).text();
          console.log(thisNum);
          if (addnum < thisNum) {
            page++; //page
            createFragment(keyTime, page,goods_name);
            return false;
          }
        });
      }
    });
    // 减少页数
    $(".mui-icon-arrowleft").on("tap", function() {
      // var jianNum = $(".page_color").text();
      var dataId = $(this).data('id');
      var jianNum ;
      console.log(page);
      if(dataId==1){
        jianNum = $(".onePage").find(".page_color").text();
        $(".onePage .page_son").each(function(v, i) {
          var thisNum = $(this).text();
          if (jianNum > thisNum) {
            page--; //page
            createFragment(keyTime, page,goods_name);
            return false;
          }
        });
      }
    });
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
          createFragment(keyTime, page,goods_name);
          // console.log("刷新");
        }
      }
    });
    
    
  });
  