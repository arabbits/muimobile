$(function() {
  var page = 1;
  var pageTwo = 1;
  var keyTime;
  var spanPage = 1; //全局
  var nextPage = 1; // 第二个表的page
  $.ajax({
    url: api + "smobileTodayStorePrice",
    type: "post",
    headers: { sellermobileauthkey: token },
    beforeSend: function() {
      $(".loading").show();
    },
    data: {
      page: page,
      limit: 10
    },
    success: function(data) {
      $(".loading").hide();
      $(".che_main").show();
      console.log(data);
      if (data.result) {
        // spanPage = Math.ceil(data.orderCount / 8);
        // nextPage = Math.ceil(data.saleCount / 8);
        // console.log(render(spanPage, page)); // 渲染page
        $(".onePage").html(render(spanPage, page));
        $(".twoPage").html(render(nextPage, page));
        
        // echarts 准备代码
        if (data.ecChart.length == 0) {
          $(".drive_main").hide();
        }else{
          var pastDate = data.ecChart;
          var title = data.name; // 标题
          var seriesData = []; // 营业额度 y轴
          var xAxisData = [];  // 时间 x轴
          $.each(pastDate,function(v,i){
              // seriesData.push(Math.ceil(i.allPrice));  
              seriesData.push(i.orderDataPrice*1);
              xAxisData.push(i.c_time);
          })
          echart5(title, seriesData, xAxisData);
        }
        
        $('.page_twoNum').text(data.orderCount);
        $('.page_num').text(data.saleCount);
        $(".all_dayPrice").text(data.orderAllPrice);
        $(".all_yuPrice").text(data.saleAllPrice);
        $(".todayMoney").html(template("tpl", data));
        $(".todayYu").html(template("tpls", data));
      } else {
        mui.toast(data.msg);
      }
      if (data.orderData.length == 0) {
        $(".todayMoney").append(`<div class="che_display noHave">
                <span>暂无数据</span>
            </div> `);
        $('.shitsOne').hide();
            
      }else{
        $('.shitsOne').show();
      }
      if(data.saleData.length == 0){
        $(".todayYu").append(`<div class="che_display noHave">
                <span>暂无数据</span>
            </div> `);
        $('.shitsTwo').hide();
      }else{
        $('.shitsTwo').show();
      }
    }
  });
  // 搜索时加载
  function createFragment(keyTime, page) {
    $.ajax({
      url: api + "smobileTodayStorePrice",
      type: "post",
      headers: { sellermobileauthkey: token },
      beforeSend: function() {
        $(".loading").show();
      },
      data: {
        limit: 8,
        page: page,
        "key[time]": keyTime
      },
      success: function(data) {
        $(".loading").hide();
        console.log(data);
        if (data.result) {
          spanPage = Math.ceil(data.orderCount / 8);
          nextPage = Math.ceil(data.saleCount / 8);
          
          console.log(spanPage);
          // console.log(render(spanPage, page)); // 渲染page
          $(".onePage").html(render(spanPage, page));
          $(".twoPage").html(render(nextPage, page));
          
          if (data.ecChart.length == 0) {
            $(".drive_main").hide();
          }else{
            $(".drive_main").show();
            
            var pastDate = data.ecChart;
            var title = data.name; // 标题
            var seriesData = []; // 营业额度 y轴
            var xAxisData = [];  // 时间 x轴
            $.each(pastDate,function(v,i){
                // seriesData.push(Math.ceil(i.allPrice));
                seriesData.push(i.orderDataPrice*1);
                xAxisData.push(i.c_time);
            })
            echart5(title, seriesData, xAxisData);
          }
          
          $('.page_twoNum').text(data.orderCount);
          $('.page_num').text(data.saleCount);
          $(".all_dayPrice").text(data.orderAllPrice);
          $(".all_yuPrice").text(data.saleAllPrice);
          $(".todayMoney").html(template("tpl", data));
          $(".todayYu").html(template("tpls", data));

        } else {
          mui.toast(data.msg);
        }
        if (data.orderData.length == 0) {
          $(".todayMoney").append(`<div class="che_display noHave">
                  <span>暂无数据</span>
              </div> `);
          $('.shitsOne').hide();
        }else{
          $('.shitsOne').show();
        }
        if(data.saleData.length == 0){
          $(".todayYu").append(`<div class="che_display noHave">
                  <span>暂无数据</span>
              </div> `);
          $('.shitsTwo').hide();
              
        }else{
          $('.shitsTwo').show();
        }
      }
    });
  }
  // 页数变化时第一个表加载
  function pageFragment(keyTime, page) {
    $.ajax({
      url: api + "smobileTodayStorePrice",
      type: "post",
      headers: { sellermobileauthkey: token },
      beforeSend: function() {
        $(".loading").show();
      },
      data: {
        limit: 8,
        page: page,
        "key[time]": keyTime
      },
      success: function(data) {
        $(".loading").hide();
        console.log(data);
        if (data.result) {
          spanPage = Math.ceil(data.orderCount / 8);
          console.log(spanPage);
          $(".onePage").html(render(spanPage, page));
          if (data.ecChart.length == 0) {
            $(".drive_main").hide();
          }else{
            $(".drive_main").show();
            
            var pastDate = data.ecChart;
            var title = data.name; // 标题
            var seriesData = []; // 营业额度 y轴
            var xAxisData = [];  // 时间 x轴
            $.each(pastDate,function(v,i){
                // seriesData.push(Math.ceil(i.allPrice));
                seriesData.push(i.orderDataPrice*1);
                xAxisData.push(i.c_time);
            })
            echart5(title, seriesData, xAxisData);
          }
          
          $('.page_twoNum').text(data.orderCount);
          $(".all_dayPrice").text(data.orderAllPrice);
          $(".todayMoney").html(template("tpl", data));
        } else {
          mui.toast(data.msg);
        }
        if (data.orderData.length == 0) {
          $(".todayMoney").append(`<div class="che_display noHave">
                  <span>暂无数据</span>
              </div> `);
          $('.shitsOne').hide();
        }else{
          $('.shitsOne').show();
        }
      }
    });
  }
  // 第二个表的加载
  function twoFragment(keyTime, page) {
    $.ajax({
      url: api + "smobileTodayStorePrice",
      type: "post",
      headers: { sellermobileauthkey: token },
      beforeSend: function() {
        $(".loading").show();
      },
      data: {
        limit: 8,
        page: page,
        "key[time]": keyTime
      },
      success: function(data) {
        $(".loading").hide();
        console.log(data);
        if (data.result) {
          nextPage = Math.ceil(data.saleCount / 8);
          console.log(spanPage);
          $(".twoPage").html(render(nextPage, page));
          $('.page_num').text(data.saleCount);
          $(".all_yuPrice").text(data.saleAllPrice);
          $(".todayYu").html(template("tpls", data));
        } else {
          mui.toast(data.msg);
        }
        if(data.saleData.length == 0){
          $(".todayYu").append(`<div class="che_display noHave">
                  <span>暂无数据</span>
              </div> `);
          $('.shitsTwo').hide();
              
        }else{
          $('.shitsTwo').show();
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
    page = 1;
    // console.log(start,end);
    if (end && start) {
      !end == true ? (end = 0) : (end = end);
      console.log(end);
      keyTime = start + "," + end;
      console.log(keyTime);
      createFragment(keyTime, page);
    } else {
      mui.toast("请选择开始时间与结束时间!");
    }
  });
  //选择时间
  $(".search_fa input").on("tap", function() {
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
      pageFragment(keyTime, page);
    }else if(dataId==2){
      pageTwo = that.text();
      pageTwo = pageTwo*1;
      twoFragment(keyTime, pageTwo);
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
          pageFragment(keyTime, page);
          return false;
        }
      });
    }else if(dataId==2){
      addnum = $(".twoPage").find(".page_color").text();
      console.log(addnum);
      
      $(".twoPage .page_son").each(function(v, i) {
        var thisNum = $(this).text();
        console.log(thisNum);
        if (addnum < thisNum) {
          pageTwo++; //page
          twoFragment(keyTime, pageTwo);
          return false;
        }
      });

    }
    // var addnum = $(".page_color").text();
    
    // $(".page_son").each(function(v, i) {
    //   var thisNum = $(this).text();
    //   if (addnum < thisNum) {
    //     // $(".page_color")
    //     //   .removeClass("page_color")
    //     //   .next()
    //     //   .addClass("page_color");
    //     page++; //page
    //     // createFragment(keyTime, page);
    //     return false;
    //   }
    // });
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
          pageFragment(keyTime, page);
          return false;
        }
      });
    }else if(dataId==2){
      jianNum = $(".twoPage").find(".page_color").text();
      $(".twoPage .page_son").each(function(v, i) {
        var thisNum = $(this).text();
        if (jianNum > thisNum) {
          pageTwo--; //pageTwo
          twoFragment(keyTime, pageTwo);
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
        pageFragment(keyTime, page);
        // console.log("刷新");
      }
    }else if(dataId==2){
      pagesNum = $(".twoPagenum").val()
      pagesNum = pagesNum*1;
      var jianNum =  $(".twoPage").find(".page_color").text();
      var leng = [];
      $(".twoPage .page_son").each(function(v,i){
        var number = $(this).text()*1;
        leng.push(number);
      })
      var lengths = Math.max.apply(Math,leng);
      console.log(lengths);  
      console.log(pagesNum);  
      if (pagesNum != jianNum && pagesNum > 0 && pagesNum) {
        pagesNum > lengths ? (pagesNum = lengths) : (pagesNum = pagesNum);
        pageTwo = pagesNum;
        twoFragment(keyTime, pageTwo);
        // console.log("刷新");
      }

    }
    // var leng = [];
    // $(".page_son").each(function(v,i){
    //   var number = $(this).text()*1;
    //   leng.push(number);
    // })
    // var lengths = Math.max.apply(Math,leng);
    // console.log(lengths);  
    // if (pagesNum != jianNum && pagesNum > 0 && pagesNum) {
    //   pagesNum > lengths ? (pagesNum = lengths) : (pagesNum = pagesNum);
    //   page = pagesNum;
    //   // createFragment(keyTime, page);
    //   // console.log("刷新");
    // }
  });


  // var startX ,moveX,scrollLeft,scrollRight;
  // scrollLeft= $('.day_box').offset().left; //获得盒子离视图左边的距离
  // scrollRight= $('.day_box').offset().top; //获得盒子离视图右边边的距离
  // moveX=0;
  // console.log(scrollLeft)
  // console.log(scrollRight)
  // $('.day_box').on('touchstart',function(event){
  //   console.log(event)
  //   startX = event.originalEvent.changedTouches[0].clientX;
  //   console.log(startX)
  // })
  // $('.day_box').on('touchmove',function(event){
  //   // console.log(event)
  //   moveX = event.originalEvent.changedTouches[0].clientX-startX;
  //   // console.log(moveX)
  //   console.log( event.originalEvent.changedTouches[0].clientX)
  //   $('.day_box').css('transform','translate('+moveX+'px)');
  // })
  // $('.day_box').on('touchend',function(event){
  //   console.log(event)
  //   moveX = event.originalEvent.changedTouches[0].clientX-startX;
  //   console.log(moveX)
  //   if(moveX>0){
  //     $('.day_box').css('transform','translate(0px)');
  //   }else if(moveX<0){
  //     $('.day_box').css('transform','translate('+moveX+'px)');
  //   }else if(moveX==0){
  //     // $('.day_box').css('transform','translate(0px)');
  //   }
  // })
  
});
