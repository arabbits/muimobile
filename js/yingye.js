

function echart5(title, seriesData, xAxisData) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("breakChart"));

    // 指定图表的配置项和数据
    var option = {
      color: ["#ea5504"],
    //   title: {
    //     text: title,
    //     symbolSize:2
    //   },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["实际利润"]
      },
      grid: {
        show: false,
        left: "2%",
        top: "10%",
        containLabel: true,
        width: "92%",
        height: "90%"
      },
      xAxis: {
        // name: "时间",
        color:"#ea5504",
        data: xAxisData,
        axisLabel: {
          rotate: 50,
          interval: 0, //标签设置为全部显示
          formatter: function(params) {
            var newParamsName = ""; // 最终拼接成的字符串
            var paramsNameNumber = params.length; // 实际标签的个数
            var provideNumber = 6; // 每行能显示的字的个数
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
            /**
             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
             */
            // 条件等同于rowNumber>1
            if (paramsNameNumber > provideNumber) {
              /** 循环每一行,p表示行 */

              tempStr = params.substring(0, params.indexOf(" ")) + "\n";
              newParamsName += tempStr;
              tempStr = params.substring(params.indexOf(" "));
              newParamsName += tempStr;
            } else {
              // 将旧标签的值赋给新标签
              newParamsName = params;
            }
            //将最终的字符串返回
            return newParamsName;
          }
        }
      },
      yAxis: {
        name: title,
        nameRotate:1, //标题角度变化
        nameGap:22
      },
      series: [
        {
          name: "总价",
          type: "bar",
          data: seriesData,
          barWidth: 20,
          label:{
              normal:{
                  show:true,            //显示数字
                  position: 'top',        //这里可以自己选择位置
                  textStyle: {
                      fontSize:10,
                      color:"#ea5504",
                      position:'center'
                  },
              }
          },
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  // version();
  // function version(){
  //   $('script').each(function(v,i){
  //     $(this).attr('src',$(this).attr('src')+'?v=1.0.2')
  //   });
  //   $('link').each(function(val,index){
  //     $(this).attr('href',$(this).attr('href')+'?v=1.0.2');
  //   })
  
  // }