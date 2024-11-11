let obj_btn = document.getElementById("btn");
let obj_span = document.getElementById("span");
let obj_prompt = document.getElementById('prompt')
let cd_send_message = 60 * 1000;
let last_send_time = 0;

obj_btn.onmouseover = function () {
    obj_span.style.visibility = 'visible';
}

obj_btn.onmouseout = function () {
    obj_span.style.visibility = 'hidden';
}

let timeSendMessage = null;

obj_btn.onmousedown = function () {

    // 发送成功页面点开时不能发送消息
    if (obj_prompt.style.visibility === 'visible') {
        return ;
    }

    // 发送CD
    let now_time = (new Date()).getTime()
    if (now_time - last_send_time <= cd_send_message) {
        alert("频繁发送消息, 请稍后再发")
        return ;
    }

    // 空消息
    let obj_txt = document.getElementById('msg_text')
    if (!obj_txt.value || !obj_txt.value.length) {
        alert("不能发送空信息")
        return ;
    }

    // 初始化动画
    obj_btn.style.animation = 'move 3s 1';

    console.log("send_message Timeout Start")

    // 定时发送
    timeSendMessage = setTimeout( function () {
        submit_message()
    }, 2 * 1000 );

    last_send_time = now_time;
    return false;
}

obj_btn.onmouseup = function () {
    console.log("send_message Timeout End")
    clearTimeout(timeSendMessage)
    return false;
}

obj_btn.onmousemove = function () {
    console.log("send_message Timeout End")
    clearTimeout(timeSendMessage)
    timeSendMessage = null;
}

let timeClosePrompt = null;
function submit_message() {
    let obj_form = document.getElementById('form')
    obj_form.submit();

    // 重置textarea
    let obj_txt = document.getElementById('msg_text')
    obj_txt.value = ''

    // 重置按钮动画
    obj_btn.style.animation = 'none';

    // 显示成功提示
    obj_prompt.style.visibility = 'visible'

    // 定时关闭成功提示弹窗
    timeClosePrompt = setTimeout(function () {
        close_prompt()
    }, 5000)
    clearTimeout(timeSendMessage)
    console.log("submit_message Success")
}

function close_prompt() {
    obj_prompt.style.visibility = 'hidden'
}

obj_prompt.onclick = function () {
    obj_prompt.style.visibility = 'hidden'
}