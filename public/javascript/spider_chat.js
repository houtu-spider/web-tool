import { send_toast } from './send_toast.js'
let msg = document.createElement('div')
msg.setAttribute('class', '')

// 组件
let obj_message_content = document.getElementById('message_content')
let obj_clear_history = document.getElementById('clear_history')
let obj_send_btn = document.getElementById('send_btn')
let obj_chat_box = document.getElementById('chat_box')
let obj_message_form = document.getElementById('message_form')

// 数据
let msg_list = []
const msg_type = {
    ai: "system",
    usr: "user",
}

// action
// 清理历史记录
obj_clear_history.addEventListener('click', function () {
    // 清理ai消息组件
    let ai_msg_list = document.getElementsByClassName('show_msg_ai')
    for (let div of ai_msg_list) {
        div.remove()
    }
    // 清理usr消息组件
    let usr_msg_list = document.getElementsByClassName('show_msg_usr')
    for (let div of usr_msg_list) {
        div.remove()
    }
    // 清空消息
    msg_list = []
    // 清理当前输入问题
    obj_message_content.textContent = null
})
// 发送消息
obj_send_btn.addEventListener('click', function () {
    let usr_msg = obj_message_content.value;
    if (!usr_msg.length) {
        send_toast("问题不能为空", 'error')
        return ;
    }
    msg_list.push({type: msg_type.usr, msg: usr_msg})
    let temp_input = document.createElement('input')
    temp_input.style.display = 'none'
    temp_input.value = JSON.stringify(msg_list)
    temp_input.name = 'chat_msg'
    obj_message_form.appendChild(temp_input)
    obj_message_form.submit()
    temp_input.remove()
    send_toast("发送成功", 'success')
})