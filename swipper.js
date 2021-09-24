window.addEventListener('load', function() {
    //动画函数
    function animate(obj, target, callback) {

        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面
                // if (callback) {
                //     // 调用函数
                //     callback();
                // }
                callback && callback();
            }
            // 把每次加 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            obj.style.left = obj.offsetLeft + step + 'px';

        }, 15);
    };
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.swiper-item');
    var focuswidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function() {
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
        timer = setInterval(function() {
            arrow_r.click()
        }, 2000);
    })
    var lis = document.querySelector('.swiper-ul');
    var dot = document.querySelector('.dot');
    //控制点击右侧按钮
    var num = 0;
    //控制小圆点播放
    var circle = 0;
    //创建小圆点
    for (let i = 0; i < lis.children.length; i++) {
        //创建span
        var span = document.createElement('span')
            //添加自定义属性
        span.setAttribute('index', i)
        dot.appendChild(span)
            //给小圆点绑定点击事件
        span.addEventListener('click', function() {
            //给所有span清除current类
            for (let i = 0; i < dot.children.length; i++) {
                dot.children[i].className = ''
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            animate(lis, -index * focuswidth);
            circle = num = index;
            circleChange()
        })
    };
    //克隆第一张图片放到ul后面
    var first = lis.children[0].cloneNode(true);
    lis.appendChild(first);
    //设置节流阀
    var flag = true;
    //右侧按钮点击事件
    arrow_r.addEventListener('click', function() {
            if (flag) {
                // 延迟 删除动画类 disappear appear
                // setTimeout(function() {
                //     lis.children[num].classList.remove("disappear");
                //     lis.children[num].classList.remove("appear");
                // }, 500);
                flag = false
                if (num == lis.children.length - 1) {
                    lis.style.left = 0;
                    num = 0;
                };
                num++;
                animate(lis, -num * focuswidth, function() {
                    flag = true
                });
                // // 增加动画类 disappear appear
                // lis.children[num].classList.add("disappear");
                // lis.children[num].classList.add("appear");
                //控制小圆点播放
                circle++;
                if (circle == dot.children.length) {
                    circle = 0
                }
                circleChange()

            }
        })
        //左侧按钮点击事件
    arrow_l.addEventListener('click', function() {
            if (flag) {
                flag = false
                if (num == 0) {
                    num = lis.children.length - 1;
                    lis.style.left = -num * focuswidth + 'px';

                };
                num--;
                animate(lis, -num * focuswidth, function() {
                    flag = true
                });
                //控制小圆点播放
                circle--;
                if (circle == 0) {
                    circle = dot.children.length
                }
                circleChange()
            }
        })
        //小圆点样式切换
    function circleChange() {
        for (let i = 0; i < dot.children.length; i++) {
            dot.children[i].className = '';
        }
        dot.children[circle].className = 'current';
    }
    //自动播放轮播图
    var timer = setInterval(function() {
        arrow_r.click()
    }, 2000)

})