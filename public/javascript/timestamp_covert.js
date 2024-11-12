let copy_time_display = 's'
let copy_time_timeout = null
let obj_show_copy_time = document.getElementById('show_copy_time')
let obj_show_unit = document.getElementById('show_unit')
import { send_toast } from './send_toast.js'

copy_time_timeout = setInterval(change_copy_time_show, 100)

function change_copy_time_show () {
    let now_time = (new Date()).getTime();
    if (copy_time_display == 's') {
        now_time = parseInt(now_time / 1000)
    }
    obj_show_copy_time.textContent = now_time.toString()
}

function copy_time_switch_time () {
    if (copy_time_display == 's') {
        copy_time_display = 'ms'
        obj_show_copy_time.style.width = '240px'
        obj_show_unit.textContent = '毫秒'
    } else {
        copy_time_display = 's'
        obj_show_copy_time.style.width = '200px'
        obj_show_unit.textContent = '秒'
    }
}

// 切换单位
let obj_switch_time = document.getElementById('switch_time')
obj_switch_time.onclick = function () {
    copy_time_switch_time();
    change_copy_time_show();
}

// 点击复制
let obj_copy_time_btn = document.getElementById('copy_time_btn')
obj_copy_time_btn.onclick = function () {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(obj_show_copy_time.textContent)
    } else {
        let cp_input = document.createElement('input')
        document.body.appendChild(cp_input)
        cp_input.value = obj_show_copy_time.textContent
        cp_input.select()
        document.execCommand('copy')
        cp_input.style.display = 'none'
    }
    send_toast("复制成功")
}

let obj_time_show_1 = document.getElementById("time_show_1")
let obj_time_show_2 = document.getElementById("time_show_2")
let time_unit_1 = 's'
let time_show_interval = null

function get_time_show_1 () {
    let now_time = (new Date()).getTime();
    if (time_unit_1 == 's') {
        now_time = parseInt(now_time / 1000)
    }
    return now_time.toString()
}

function get_time_show (now_time) {
    let yyyy = now_time.getFullYear()
    let mon = now_time.getMonth() + 1
    let dd = now_time.getDate()
    if (dd < 10) {
        dd = '0' + dd
    }
    let hh = now_time.getHours()
    let mm = now_time.getMinutes()
    let ss = now_time.getSeconds()
    if (ss < 10) {
        ss = '0' + ss
    }
    return `${yyyy}-${mon}-${dd} ${hh}:${mm}:${ss}`;
}

obj_time_show_1.value = get_time_show_1()
obj_time_show_2.value = get_time_show(new Date())

// 切换单位
let obj_change_format_1 = document.getElementById('change_format_1')
obj_change_format_1.onclick = function () {
    if (time_unit_1 == 's') {
        time_unit_1 = 'ms'
        obj_time_show_1.value = obj_time_show_1.value + '000'
    } else {
        time_unit_1 = 's'
        obj_time_show_1.value = (parseInt(obj_time_show_1.value) / 1000).toString()
    }
}

// 时间戳转日期
let obj_trans_1 = document.getElementById('trans_1')
obj_trans_1.onclick = function () {
    let time_stamp = parseInt(obj_time_show_1.value)
    if (time_unit_1 == 's') {
        time_stamp *= 1000
    }
    let obj_time_answer_1 = document.getElementById('time_answer_1')
    obj_time_answer_1.textContent = get_time_show(new Date(time_stamp))
}

// 日期转时间
let obj_trans_2 = document.getElementById('trans_2')
obj_trans_2.onclick = function () {
    let time_str = obj_time_show_2.value
    let obj_time_answer_2 = document.getElementById('time_answer_2')
    obj_time_answer_2.textContent = (new Date(time_str + " UTC").getTime() / 1000).toString()
}