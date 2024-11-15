const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
    res.render('detail/send_me_message')
})

router.post('/send_message', function (req, res) {
    let ip = getClientIp(req);
    let host = req.hostname;
    let message = req.body.web_message;
    message = `sender: ${ip} ${host}\n` + message;
    return send_msg(message);
})

async function send_msg(message) {
    if (!message || !message.length) {
        return false;
    }

    let data = {
        msg_type: "text",
        content: {
            text: message,
        },
    };
    await fetch("https://open.feishu.cn/open-apis/bot/v2/hook/14451567-0ab4-482f-ad7e-42dcfd724617", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    console.log("send_msg Success")
    return true;
}

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        'un catch';
}

function ipv6ToV4(ip) {
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    ip = ip.substr(ip.lastIndexOf(':')+1,ip.length);
    return ip
}

module.exports = router;