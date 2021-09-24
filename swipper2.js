window.addEventListener('load', function() {
    //获取变量
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var lis = document.querySelector('.swiper-ul');
    var imglis = lis.querySelectorAll('img');
    var dot = document.querySelector('.dot');
    var showbox = document.querySelector('.swiper-item');
    var timer = null;
    var index = 0;
    //给小圆点绑定点击事件
    // 遍历所有圆点实现闪过切换至对应的图片,初始化并给每个按钮添加鼠标点击功能
    for (var i = 0; i < dot.children.length; i++) {
        (function(j) { //自执行函数，获取i
            dot.children[j].onclick = function() {
                picture(j);
                index = j;
            }
        })(i);
        /*为什么要在最后加(i)? 这是保留i值的方法，
                    通常情况下，因为一些效果我们需要获取到for循环中的i的值，
                    但是往往拿到的都是最后一个i的值，所以通过这种方法来获取i值。*/
    }
    // 设置自动播放函数
    timer = setInterval(autoPlay, 3000);

    //鼠标滑过容器停止播放
    showbox.onmouseenter = function() {
            clearInterval(timer);
        }
        // 鼠标离开容器时继续播放下一张
    showbox.onmouseout = function() {
        timer = setInterval(autoPlay, 3000);
    }

    // 实现自动轮播
    function autoPlay() {
        index++;
        if (index >= imglis.length) {
            index = 0;
        }
        picture(index);
    }

    // 设置点击左边箭头时，图片和按钮随着变化
    arrow_l.onclick = function() {
        index--;
        if (index < 0) {
            index = 4;
        }
        picture(index);
    };

    // 设置点击右边箭头时，图片和按钮随着变化
    arrow_r.onclick = function() {
        index++;
        if (index > 4) {
            index = 0;
        }
        picture(index);
    }


    console.log(imglis)
        // 根据按钮显示当前的图片
    function picture(offset) {
        for (var i = 0; i < imglis.length; i++) {
            imglis[i].className = "unshow";
            dot.children[i].className = ''
        }
        imglis[offset].className = "show";
        dot.children[offset].className = "current";
    }
})