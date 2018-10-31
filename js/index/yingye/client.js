$(function() {
    var page = 1;
    var pageTwo = 1;
    var keyTime;
    var spanPage = 1; //全局
    var nextPage = 1; // 第二个表的page
    $.ajax({
      url: api + "smobileGetCartUserCycle",
      type: "post",
      headers: { sellermobileauthkey: token },
      beforeSend: function() {
        $(".loading").show();
      },
      data: {
        page: page,
        limit: 8
      },
      success: function(data) {
        $(".loading").hide();
        $(".che_main").show();
        console.log(data);
        if (data.result) {
            spanPage = Math.ceil(data.count / 8);
          $(".onePage").html(render(spanPage, page));
          // echarts 准备代码
          if (data.length == 0) {
            $(".drive_main").hide();
          }else{
            var pastDate = data.data;
            var title = "到店数"; // 标题
            var seriesData = []; // 营业额度 y轴
            var xAxisData = [];  // 时间 x轴
            $.each(pastDate,function(v,i){
                // seriesData.push(Math.ceil(i.allPrice));  
                seriesData.push(i.reach_num*1);
                xAxisData.push(i.add_time);
            })
            echart5(title, seriesData, xAxisData);
          }
          $('.page_twoNum').text(data.orderCount);
          $(".all_dayPrice").text(data.orderAllPrice);
          $(".todayMoney").html(template("tpl", data));
        } else {
          mui.toast(data.msg);
        }
        if (data.data.length == 0) {
          $(".todayMoney").append(`<div class="che_display noHave">
                  <span>暂无数据</span>
              </div> `);
          $('.shitsOne').hide();
              
        }else{
          $('.shitsOne').show();
        }
      }
    });
    // 搜索时加载
    function createFragment(keyTime, page,sequence,srName) {
        $.ajax({
            url: api + "smobileGetCartUserCycle",
            type: "post",
            headers: { sellermobileauthkey: token },
            beforeSend: function() {
              $(".loading").show();
            },
            data: {
              page: page,
              limit: 8,
              'key[sort]': sequence,
              'key[field]':srName
            },
            success: function(data) {
              $(".loading").hide();
              $(".che_main").show();
              console.log(data);
              if (data.result) {
                spanPage = Math.ceil(data.count / 8);
                // console.log(render(spanPage, page)); // 渲染page
                $(".onePage").html(render(spanPage, page));
                // echarts 准备代码
                if (data.length == 0) {
                  $(".drive_main").hide();
                }else{
                  var pastDate = data.data;
                  var title = "到店数"; // 标题
                  var seriesData = []; // 营业额度 y轴
                  var xAxisData = [];  // 时间 x轴
                  $.each(pastDate,function(v,i){
                      // seriesData.push(Math.ceil(i.allPrice));  
                      seriesData.push(i.reach_num*1);
                      xAxisData.push(i.add_time);
                  })
                  echart5(title, seriesData, xAxisData);
                }
                $('.page_twoNum').text(data.orderCount);
                $(".all_dayPrice").text(data.orderAllPrice);
                $(".todayMoney").html(template("tpl", data));
              } else {
                mui.toast(data.msg);
              }
              if (data.data.length == 0) {
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
        createFragment(keyTime, page);
      }else if(dataId==2){
        pageTwo = that.text();
        pageTwo = pageTwo*1;
        createFragment(keyTime, pageTwo);
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
            createFragment(keyTime, page);
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
            createFragment(keyTime, pageTwo);
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
            createFragment(keyTime, page);
            return false;
          }
        });
      }else if(dataId==2){
        jianNum = $(".twoPage").find(".page_color").text();
        $(".twoPage .page_son").each(function(v, i) {
          var thisNum = $(this).text();
          if (jianNum > thisNum) {
            pageTwo--; //pageTwo
            createFragment(keyTime, pageTwo);
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
          createFragment(keyTime, page);
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
          createFragment(keyTime, pageTwo);
          // console.log("刷新");
        }
  
      }
    });
    
    //  点击重新排序

    $('.inThis').on('tap',function(){
        // mui.toast('哈哈')
        $(this).find('.mui-icon-forward').toggleClass('rotates');
        var id = $(this).data('id');
        var sequence,srName;
        if($(this).find('.mui-icon-forward').hasClass('rotates')){
          sequence = 'asc';
          mui.toast('正序');
        }else{
          sequence = 'desc';
          mui.toast('倒叙');
        }
        if(id==1){
          srName = 'sr.reach_num';
          createFragment(keyTime, pageTwo,sequence,srName);
        }else if(id==2){
          srName = 'sr.cycle';
          createFragment(keyTime, pageTwo,sequence,srName);
        }else if(id==3){
          srName = 'store_days';
          createFragment(keyTime, pageTwo,sequence,srName);
        }else if(id==4){
          srName = 'sr.add_time';
          createFragment(keyTime, pageTwo,sequence,srName);
        }

    })
  });
  