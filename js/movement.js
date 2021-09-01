const NEW_URL = "iwenwiki.com/api";
const OLD_URL1 = "iwen.wiki/sxtstu";

$(function () {
    //点击按钮播放和暂停切换功能
    $btn = $(".container .player img");
    var myAudio = document.querySelector("audio");
    $btn.click(function () {
        if (myAudio.paused) {//暂停时
            play();
        } else {
            pause();
        }
    })
    //播放音乐，并修改图标
    function play() {
        myAudio.play();
        $btn.attr("src", "./img/pause.png");
    }
    //暂停音乐，并修改图标
    function pause() {
        myAudio.pause();
        $btn.attr("src", "./img/play-btn_03.png");
    }

    //显示当前播放的时长
    myAudio.ontimeupdate = function () {
        var time = myAudio.currentTime;
        var timeStr = formatTimes(time);
        $(".begin").html(timeStr);

        //更新进度条
        updateProgressBar(time);
        audioAdd();
    }
    //将音乐当前播放的时长，进行格式化 xx:xx
    function formatTimes(time) {
        var seconds = ~~time;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (seconds < 60) {
            return "00:" + seconds;
        }
        //超出1分钟
        var minutes = ~~(seconds / 60);
        seconds = seconds % 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }

    //设置总时长
    myAudio.ondurationchange = function () {
        $(".finish").html(formatTimes(myAudio.duration));
    }

    //进度条
    var progressBar = document.querySelector(".progressBar");
    function updateProgressBar(currentTime) {
        //音乐的总长度
        var duration = myAudio.duration;
        //当播放时占总长的百分比
        var percent = currentTime / duration * 100 + "%";
        //设置自定义进度条的长度
        progressBar.style.width = percent;
    }

    // 当音乐播放到进度条末尾时，图标状态
    function audioAdd() {
        if (myAudio.ended) {
            pause();
        }
    }


    //动态绑定音乐数据
    $.ajax({
        type: "get",
        url: "http://iwenwiki.com/api/blueberrypai/getSongInfo.php?song=mo",
        dataType: "json",
        success: function (res) {
            showMoveSong(res)
        }
    })

    function showMoveSong(jsonObj) {
        var obj = jsonObj.songInfo;
        $(".episode-name h3").html(obj.song_title);
        $(".episode-amount span").html(obj.play_num);
        $(".episode-song-text p").html(obj.song_intro_cont);
        var src = obj.song_source.replace(OLD_URL1, NEW_URL);
        $("audio").attr("src", src);

    }

    //音乐文章部分
    myAjax({
        type: "get",
        url: "http://iwenwiki.com/api/blueberrypai/getInterestingInfo.php",
        dataType: "json",
        success: function (res) {
            showMoveArticle(res);
        }
    })

    function showMoveArticle(jsonObj) {
        var obj = JSON.parse(jsonObj);
        var arr = obj.interestingInfo;
        var formatInfo = formatArticle(arr.interest_cont);
        var content = `<div class="article-title">
            <h3>${arr.interest_title}</h3>
            <div class="title-left">
                <span><i class="iconfont">&#xe62b;</i>${arr.eye_num}</span>
                <span><i class="iconfont">&#xe6f5;</i>${arr.wei_chat_num}</span>
            </div>
            <div class="title-right">
                创建时间 : ${arr.interest_create_time}
            </div>
        </div>
        <div class="article-text">
        <p class ="text">${formatInfo}</p>
        </div>`;
        $(".article-container").html(content);

        //文章格式空格格式调整
        function formatArticle(article) {
            var arr = article.split("\r\n");
            var info = "";
            for (i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    info += `<p>${arr[i]}</p>`;
                } else {
                    info += `<p class ="text"></p>`;
                }
            }
            return info;
        }
    }



})