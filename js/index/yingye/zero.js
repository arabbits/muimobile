$(function() {
  var page = 1;
  var keyTime;
  var spanPage = 1; //全局
  $.ajax({
    url: api + "smobileZeroHour",
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
        spanPage = Math.ceil(data.count / 10);
        render(spanPage, page);
        // echarts 准备代码
        if (data.ecChart.length == 0) {
          $(".drive_main").hide();
        }else{
          var pastDate = data.ecChart;
          var title = data.name; // 标题
          var seriesData = []; // 营业额度 y轴
          var xAxisData = [];  // 时间 x轴
          $.each(pastDate,function(v,i){
              console.log(i);
              // seriesData.push(Math.ceil(i.allPrice));
              seriesData.push(i.allPrice*1);
              xAxisData.push(i.c_time);
          })
          echart5(title, seriesData, xAxisData);
        }
        $('.page_num').text(data.count);
        $(".all_dayPrice").text(data.allPrice);
        $(".day_mains").html(template("tpl", data));
      }
      if (data.data.length == 0) {
        $(".day_mains").append(`<div class="che_display noHave">
                <span>暂无数据</span>
            </div> `);
        $('.pages').hide();
      }else{
        $('.pages').show();
      };
      if (data.code == 1001) {
        mui.alert("您的登录已失效", function() {
          localStorage.removeItem("userObj");
          location.href = "/login.html";
        });
      }
    }
  });
  // 搜索时加载
  function createFragment(keyTime, page) {
    $.ajax({
      url: api + "smobileZeroHour",
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
          spanPage = Math.ceil(data.count / 8);
          console.log(spanPage);
          render(spanPage, page);
          if (data.ecChart.length == 0) {
            $(".drive_main").hide();
          }else{
            $(".drive_main").show();
            
            var pastDate = data.ecChart;
            var title = data.name; // 标题
            var seriesData = []; // 营业额度 y轴
            var xAxisData = [];  // 时间 x轴
            $.each(pastDate,function(v,i){
                console.log(i);
                // seriesData.push(Math.ceil(i.allPrice));
                seriesData.push(i.allPrice*1);
                xAxisData.push(i.c_time);
            })
            echart5(title, seriesData, xAxisData);
          }
          
          $('.page_num').text(data.count);
          
          $(".all_dayPrice").text(data.allPrice);
          $(".day_mains").html(template("tpl", data));
        } else {
          mui.toast(data.msg);
        }
        if (data.data.length == 0) {
          $(".day_mains").append(`<div class="che_display noHave">
                  <span>暂无数据</span>
              </div> `);
          $('.pages').hide();
        }else{
          $('.pages').show();
        };
      }
    });
  }

  function render(spanPage, page) {
    var spanHtml = "";
    for (var i = 1; i <= spanPage; i++) {
      if (i == 2 && page - 2 > 1) {
        i = page - 2;
      } else if (i == page + 2 && page + 2 < spanPage) {
        i = spanPage - 1;
      } else {
          console.log(i); 
        if (i == page) {
          spanHtml += `<span class="page_color page_son">` + i + `</span>`;
        } else {
          spanHtml += `<span class="page_son">` + i + `</span>`;
        }
      }
    }
    console.log(page);
    $(".page_pages").html(spanHtml);
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
    page = that.text();
    // that.addClass('page_color').siblings().removeClass('page_color');
    // if(page)
    page = page*1;
    createFragment(keyTime, page);
  });
  // 增加页数
  $(".mui-icon-arrowright").on("tap", function() {
    var addnum = $(".page_color").text();
    $(".page_son").each(function(v, i) {
      var thisNum = $(this).text();
      if (addnum < thisNum) {
        // $(".page_color")
        //   .removeClass("page_color")
        //   .next()
        //   .addClass("page_color");
        page++; //page
        createFragment(keyTime, page);
        return false;
      }
    });
  });
  // 减少页数
  $(".mui-icon-arrowleft").on("tap", function() {
    var jianNum = $(".page_color").text();
    $(".page_son").each(function(v, i) {
      var thisNum = $(this).text();
      if (jianNum > thisNum) {
        // $(".page_color")
        //   .removeClass("page_color")
        //   .prev()
        //   .addClass("page_color");
        page--; //page
        createFragment(keyTime, page);

        return false;
      }
    });
  });
  $(".page_input .btns").on("tap", function() {
    var pagesNum = $(".pagesNum").val();
    pagesNum = pagesNum*1;
    var jianNum = $(".page_color").text();
    var leng = [];
    $(".page_son").each(function(v,i){
      var number = $(this).text()*1;
      leng.push(number);
    })
    var lengths = Math.max.apply(Math,leng);
    console.log(lengths);  
    if (pagesNum != jianNum && pagesNum > 0 && pagesNum) {
      pagesNum > lengths ? (pagesNum = lengths) : (pagesNum = pagesNum);
      page = pagesNum;
      createFragment(keyTime, page);
      // console.log("刷新");
    }
  });

  
});
