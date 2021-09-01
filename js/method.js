//生成随机数
function random(min, max) {
    return ~~(Math.random() * (max - min) + min);
}

//生成随机的数组
function randomArray(len, min, max) {
    var arr = [];
    for (let i = 0; i < len; i++) {
        arr[i] = random(min, max);
    }
    return arr;
}

//生成随机的颜色
function randomColor(min, max) {
    var red = ~~(Math.random() * (max - min + 1) + min);
    var green = ~~(Math.random() * (max - min + 1) + min);
    var blue = ~~(Math.random() * (max - min + 1) + min);
    return `rgb(${red},${green},${blue})`;
}

// $.ajax({
//     type:
//     data:{}
//     url:
//     success:
// });

//对原生的ajax封装
function myAjax(obj) {
    var xhr = new XMLHttpRequest();

    //type get post 有不同的处理 ？？
    var url = obj.url;
    var type = obj.type;

    var params = parseParams(obj.data);
    if (type === "get") {
        //默认指定get  url 做拼接
        url += "?" + params;
    }

    xhr.open(obj.type, url, true);

    //post 情况
    if (type === "post") {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        xhr.send(params);
    } else {//get
        xhr.send();
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status >= 200 && status < 300 || status == 304) {
                obj.success(xhr.response);
            }
        }
    }

}

//解析对象内的传入的参数 data:{key:value,key:value,....}
//解析的结果为 key=value&key=value....
function parseParams(data) {
    //没有参数
    if (data == undefined)
        return "";

    var params = "";
    //获得data 的所有key 以数组形式返回
    var keys = Object.keys(data);
    //遍历keys，拼接
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = data[key];

        params += key;
        params += "=";
        params += value;
        params += "&";
    }

    //有参数将最后的&切掉
    if (params.length > 0) {
        params = params.slice(0, -1);
    }
    return params;
}