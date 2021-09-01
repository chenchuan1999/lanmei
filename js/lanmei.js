$(function () {
    function fenYe(maxPage, current) {
        //翻页
        $(".zxf_pagediv").off("click").createPage({
            pageNum: maxPage,
            current: current,
            backfun: function (e) {
                console.log(e);//回调
                getLanmeiData(e.current);
            }
        });
    }


    getLanmeiData(1);
    //获取分页数据
    function getLanmeiData(num) {
        $.ajax({
            type: "get",
            url: "http://iwenwiki.com/api/blueberrypai/getBlueBerryJamInfo.php",
            data: {
                blueBerryjam_id: num
            },
            success: function (res) {
                getData(res, num);
            }

        })
    }

    function getData(res, num) {
        var arr = res.blueBerryJam;
        var str = ``;
        for (i = 0; i < arr.length; i++) {
            var imgUrl = arr[i].img.replace("iwen.wiki/sxtstu", "iwenwiki.com/api")
            str += `<div class="card-img">
                      <img src="${imgUrl}" alt="">
                      <i>${arr[i].title}</i>
                    </div>`;
        }
        $(".card .card-container").html(str);

        var max = res.maxPage;
        fenYe(max, num);

        //获取数据返回页面顶部
        $(window).scrollTop(0);
    }

    //登录按钮事件-=====================================
    //1.点击登录 显示弹框
    $("#login").click(function () {
        $(".loginBox").css('display', 'block');//透明区域
    })
    //2.点击透明层的区域 隐藏弹框界面
    $(".loginBox").click(function () {
        $(".loginBox").css('display', 'none');
    })
    //3.阻止事件冒泡
    $(".loginContent").click(function (e) {//触发子元素事件--父元素也有点击事件
        e.stopPropagation();
    })
    //4.点击登录按钮---请求接口-----
    $(".loginBtn").click(function () {
        //获取输入的账号和密码 验证码
        let user = $(".username").val();
        let pwd = $(".password").val();
        let code = $(".code").val();

        //请求后台接口-------------
        $.ajax({
            type: 'post',
            url: 'http://iwenwiki.com/api/blueberrypai/login.php',
            data: {
                user_id: user,
                password: pwd,
                verification_code: code
            },
            success: function (res) {
                //判断是否登录成功
                if (res.success) {
                    $(".loginContent .info").html('')
                    //成功了隐藏弹框 显示用户名
                    $(".loginBox").css('display', 'none');
                    $(".loginUser").css('display', 'block').html('欢迎' + user);
                    $("#login").css('display', 'none');
                    $("#register").css('display', 'none');


                } else {
                    //msg
                    $(".loginContent .info").html(res.msg);
                }
            }
        })


    })


})