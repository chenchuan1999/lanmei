const OLD_URL = "www.wwtliu.com/sxtstu";
const NEW_URL = "iwenwiki.com/api";
const OLD_URL1 = "iwen.wiki/sxtstu";
$(function () {
    // 轮播图
    function initMySwiper() {
        var mySwiper = new Swiper('#slideshowSwiper', {
            // direction: 'vertical', // 垂直切换选项
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            speed: 1000,
            loop: true, // 循环模式选项
            parallax: true,

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            }
        })
    }

    $.ajax({
        type: "get",
        url: "http://iwenwiki.com/api/blueberrypai/getIndexBanner.php",
        dataType: "json",
        success: function (res) {
            getContent(res);
            initMySwiper();
        }
    })
    var bannerDiv = document.getElementById("bannerDiv");
    function getContent(data) {
        var arr = data.banner;
        var contents = "";
        for (var i = 0; i < arr.length; i++) {
            var imgUrl = arr[i].img.replace(OLD_URL, NEW_URL);
            var str = `<div class="swiper-slide">
            <img src="${imgUrl}" alt="">
            <div class="swiper-content" data-swiper-parallax="-1000" data-swiper-parallax-duration="1500">
                <h3>${arr[i].title}</h3>
                <p>${arr[i].content}</p>
            </div>
        </div>`
            contents += str;
        }
        bannerDiv.innerHTML = contents;
    }
    // 轮播图

    //乐章
    function moveSwiper() {
        var mySwiper = new Swiper('#moveSwiper', {

            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            }
        })

    }


    $.ajax({
        type: "get",
        url: "http://iwenwiki.com/api/blueberrypai/getIndexMovement.php",
        dataType: "json",
        success: function (res) {
            moveContent(res);
            // console.log(res);
            moveSwiper();
        }
    })
    var moveWrapper = document.getElementById("moveWrapper");

    function moveContent(data) {
        var arr = data.movement;
        console.log(arr);
        const ITEM_LEN = arr.length;
        const PAGE_ITEM_COUNT = 4;
        //根据取到得数组个数，确认分页的个数
        const PAGE_COUNT = Math.ceil(ITEM_LEN / PAGE_ITEM_COUNT);
        //数组下标
        var index = 0;
        var moveStr = "";
        for (let i = 0; i <PAGE_COUNT; i++) {
            var itemsStr = "";
            for (let j = 0; j < PAGE_ITEM_COUNT; j++) {
                var ele = arr[index++];
                if (index > ITEM_LEN) {
                    break;
                }
                //图片的地址要替换为新的url
                var imgUrl = ele.img.replace(OLD_URL1, NEW_URL);
                var itemStr = `<div class="move-content ">
                <div class="move-img ">
                    <img src="${imgUrl}" alt="">
                </div>
                <div class="move-desc">
                    <h3><a href="##">${ele.title}</a></h3>
                    <p class="move-desc-first-p">
                        <a href="##">${ele.writer}</a>
                    </p>
                    <p class="move-desc-last-p">${ele.content}</p>
                </div>
            </div>`;
                itemsStr += itemStr;
            }
            moveStr += ` <div class="swiper-slide">${itemsStr}</div>`
        }
        moveWrapper.innerHTML = moveStr;
    }



    //乐章

})