$(function(){
    if($('.icon-guanbi').length>0){
        console.log('heh')
        return false;
    }else{
        // $('.gofor').on('change',function(e){
            // var files = this.files;
            // var formData = new FormData();
            // formData.append('file',$('#file')[0].files[0]);
            
            //获取上传文件
            // var file = this.files[0];
            //转换成img
            // var img = document.createElement('img');
            // img.src = window.URL.createObjectURL(file);
            
            var eleFile = document.querySelector('#file');

            // 压缩图片需要的一些元素和对象
            var reader = new FileReader(), img = new Image();

            // 选择的文件对象
            var file = null;
            // 缩放图片需要的canvas
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            // base64地址图片加载完毕后
            img.onload = function () {
                // 图片原始尺寸
                var originWidth = this.width;
                var originHeight = this.height;
                // 最大尺寸限制
                var maxWidth = 400, maxHeight = 400;
                // 目标尺寸
                var targetWidth = originWidth, targetHeight = originHeight;
                // 图片尺寸超过400x400的限制
                if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }
                    
                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight);
                // canvas转为blob并上传
                canvas.toBlob(function (blob) {
                    var form = new FormData();
                    form.append('file', blob); 
                    // 图片ajax上传
                    $.ajax({
                        url:'../parsing.php',
                        type:'post',
                        data:form,
                        contentType: false,
                        processData: false,
                        beforeSend:function(){
                            $('.loading').show();
                        },
                        success:function(data){
                            $('.loading').hide();
                            data = JSON.parse(data)
                            console.log(data)
                            if(data.result){


                                $('label').hide();
                                mui.toast('识别车牌是:'+data.msg);
                                $('.chepai').val(data.msg);
                                loadRender(data.msg,store_id);
                                //显示图片
                                var straaa = `
                                <div class="father">
                                    <img src=`+img.src+`>
                                    <span class="iconfont icon-guanbi"></span>
                                </div>`;
                                $('.familySon').append(straaa)
                            }else{
                                mui.toast('照片有误,请重新拍摄')
                            }
                        }
                    }) 
                }, file.type || 'image/png');
            };


            // 文件base64化，以便获知图片原始尺寸
            reader.onload = function(e) {
                img.src = e.target.result;
                console.log(e)
                // console.log(img.src);    
                // var straaa = `
                //             <div class="father">
                //                 <img src=`+img.src+`>
                //                 <span class="iconfont icon-guanbi"></span>
                //             </div>`;
                // $('.familySon').append(straaa)
            };
            eleFile.addEventListener('change', function (event) {
                file = event.target.files[0];
                // 选择的文件是图片
                if (file.type.indexOf("image") == 0) {
                    reader.readAsDataURL(file);    
                }
            });


            // $.ajax({
            //     url:'../parsing.php',
            //     type:'post',
            //     data:formData,
            //     contentType: false,
            //     processData: false,
            //     beforeSend:function(){
            //         $('.loading').show();
            //     },
            //     success:function(data){
            //         data = JSON.parse(data);
            //         console.log(data);
            //         $('.loading').hide();
            //         if(data.result){
                        // $('label').hide();
                        // mui.toast('识别车牌是:'+data.msg);
                        // $('.chepai').val(data.msg);
                        // loadRender(data.msg,store_id);
                        // //显示图片
                        // var img = new Image();
                        // var renderLoad = new FileReader();
                        // //readAsDataURL会将文件内容进行base64编码后输出：
                        // renderLoad.readAsDataURL(files[0]);//发起异步请求
                    
                        // // var name = files[0].name
                        // var fileName = files[0].name;
                        // renderLoad.onload = function () {
                        //     //读取完成后，数据保存在对象的result属性中
                        //     img.src = this.result;
                        
                        //     // console.log(img.src)
                        //     var base64str = img.src.split('base64,')[1];
                            
                        //     // console.log(base64str)
                        //     var imglen = $('.familySon img').length;
                        //     if (imglen<1){
                        //         var straaa = `
                        //         <div class="father">
                        //             <img src=`+img.src+`>
                        //             <span class="iconfont icon-guanbi"></span>
                        //         </div>`;
                        //         $('.familySon').append(straaa)
                        //     }else{
                        //         mui.toast('最多只能上传1张图片哦')
                        //     }
                        // }
            //         }else{
            //             mui.toast('照片有误,请重新拍摄')
            //         }
            //     },
            //     errow:function(res){
            //         console.log(res);
    
            //     }
            // })
            
        // })
        
    }
    // 关闭重新选择图片
    $('.familySon').on('tap','.icon-guanbi',function(){
        var that = $(this);
        console.log()
        mui.confirm('是否重新拍摄车牌',function(index){
            console.log(index);
            if(index.index == 1){
                that.parent().remove();
                $('label').show();
                $('.chepai').val('');
                location.reload();
            }
        })

    })
    $('.chepai').on('input',function(){
        console.log('ll')
        var vals = $(this).val();
        if(vals){
            loadRender(vals,store_id)
        } 
    })
    // $('.chepai').on('tap',function(){
    //     var valuse = $(this).val();
    //     if(!valuse){
    //         mui.toast('请试用手机拍摄')
    //     }
    // })

    // 点击行列跳转
    $('.auto_father').on('tap','.auto_list',function(){
        var cartid = $(this).data('cartid');
        var userid = $(this).data('userid');
        var cart_licens = $(this).find('.cart_pai').text();
        console.log(cartid);
        console.log(userid);
        console.log(cart_licens);
        var carObj = {cartid:cartid,userid:userid,cart_licens:cart_licens,type:1};
        carObj = JSON.stringify(carObj)
        sessionStorage.setItem('carObj',carObj);

        location.href = "./reception.html"
    })
    //渲染
    function loadRender(searchs,store_id){
        $.ajax({
            url:api+'smobileOrderSelectUser',
            type:'post',
            headers:{'sellermobileauthkey':token},
            beforeSend:function(){
                $('.loading').show();
            },
            data:{
                keyword : searchs,
                store_id : store_id,
            },
            // headers:{"userauthkey":token},
            success:function(data){
                console.log(data);
                $('.loading').hide();
                $('.texttitle').hide();
                if(data.result){
                    $('.auto_father').html(template('tpl',data))
                    if(data.data.length==0){
                        mui.toast('暂无数据,请添加新车')
                    }
                }else{
                    console.log('res')
                }
                if(data.code ==1001){
                    mui.alert('您的登录已失效',function(){
                        localStorage.removeItem('userObj');
                        location.href="/index.html"
                    })
                }
            },
            error:function(res){
                console.log(res)
            }
        })
    }
    
    $('.auto_father').on('tap','.notHave',function(){
        var chepai = $('.chepai').val();
        console.log(chepai);
        if(chepai){
            var x,y;
            x = chepai.substring(0,1);
            y = chepai.substring(1);
            console.log(x)
            console.log(y)
            var ziding = {chepai:y,option:x}
            sessionStorage.setItem('ziding',JSON.stringify(ziding))
            location.href = "./addNewcar.html"
        }
    })
})