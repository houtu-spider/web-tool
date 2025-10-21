//*************************************************************************************************************
// 高亮导航
let obj_menu = document.getElementById('menu_list')

// 点击父级分类设置当前为active
let sub_menu_list = obj_menu.getElementsByClassName('sub_first')
for (let sub_menu of sub_menu_list) {
    sub_menu.addEventListener('click', function () {
        clear_active()
        this.className += ' active'
    })
}

// 点击子分类设置当前对应父级分类为active
let sub_func_list = obj_menu.getElementsByClassName('sub_func')
for (let sub_func of sub_func_list) {
    sub_func.addEventListener('click', function () {
        clear_active()
        // 设置当前父级分类为active
        let sub_menu = sub_func.parentElement.previousElementSibling;
        sub_menu.className += ' active';
    })
}

// 清除当前active类
function clear_active () {
    let current = document.getElementsByClassName('active')
    if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
    }
}

//*************************************************************************************************************
// 按钮随机

let bh_show = document.getElementById("random_back_home");
let now_index = 0;
bh_show.addEventListener('click', function () {
    let word_list = [
        "Back Home",
        "我只是个按钮",
        "返回主页",
        "你别点我",
        "你点上面其他的"
    ];
    let bh_index = random_exclude(word_list.length, now_index);
    bh_show.innerHTML = word_list[bh_index];
    now_index = bh_index
})

function random_exclude (max, exclude) {
    while (true) {
        let index = Math.floor(max * Math.random())
        if (index != exclude) {
            return index
        }
    }
}

//*************************************************************************************************************
// 备案显示
let obj_beian = document.getElementById('beian')
obj_beian.textContent = "蜀ICP备2022011126号-1";   // 使用自己的备案信息