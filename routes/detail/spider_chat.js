const config = require("../../web_tool_config");
const url = require("url");
const crypto = require('crypto');
const ws = require('ws');


const {Url, modelDomain, APPID, APISecret, APIKey} = config.spark_api[config.now_spark_api];

let httpUrl = url.parse(Url);

const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
    res.render('detail/spider_chat', {msg_list: []})
})

router.post('/chat', async function (req, res) {
    let message = req.body.chat_msg;
    if (!message || !message.length) {
        res.end()
    }
    let msg_list = pack_msg(JSON.parse(message))
    // let ret = await spark_chat(msg_list, function (msg) {console.log(msg)})
    res.send({msg_list: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'})
})

const spark_chat = async function(question_list, deal_msg_func) {
    // 初始化问题值为空字符串
    let questionValue = '';
    await new Promise((resolve, reject) => {

        // 获取当前时间的 GMT 字符串
        const dateString = new Date().toGMTString();

        // 定义星火 API 的主机和路径
        const host = httpUrl.host;
        const path = httpUrl.path;

        // 构建用于签名的请求头
        let tmp = `host: ${host}\ndate: ${dateString}\nGET ${path} HTTP/1.1`;
        let signature = crypto
            .createHmac('sha256', APISecret)
            .update(tmp)
            .digest('base64');
        const authorization_origin = `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;

        // 将授权信息编码为 Base64 格式
        let buff = Buffer.from(authorization_origin);
        const authorization = buff.toString('base64');

        // 构建访问星火 API 的 WebSocket URL
        const signUrl = `wss://${host}${path}?authorization=${authorization}&date=${encodeURIComponent(dateString)}&host=${host}`;

        // 创建 WebSocket 连接
        let sock = new ws(signUrl);

        // 当连接打开时发送聊天请求
        sock.on('open', function () {
            console.log('spark_api connect success');
            sock.send(
                JSON.stringify({
                    header: {
                        app_id: APPID,
                    },
                    parameter: {
                        chat: {
                            domain: modelDomain,
                        },
                    },
                    payload: {
                        message: {
                            text: question_list
                            // text: [
                            // {
                            //     "role": "system",
                            //     "content": ""
                            // },
                            // {
                            //     role: 'user',
                            //     content: '中国有多少皇帝',
                            // },
                            // {
                            //     role: "system",
                            //     content: '在我国，自公元前221年秦王嬴政称“皇帝”始，到1912年最后一个封建皇帝溥仪在辛亥革命的枪声中宣布退位止，经历了2132年。在这期间：\n' +
                            //         '封建王朝皇帝总数为494人。其中未在位、死后被追尊帝者73人。边疆少数民族政权君主(单于、可汗、赞普)总数为251人。历代农民起义建元、立国、称帝(王)者，约100人。封建割据称帝者(如安禄山)。约 有60人，还有一个“中华帝国皇帝”袁世凯。'
                            // },
                            // {
                            //     role: 'user',
                            //     content: '最出名的是谁',
                            // },
                            // ],
                        },
                    },
                })
            );
        });

        // 监听连接的错误事件
        sock.on('error', function (err) {
            console.log('error: ', err);
            reject(err);
        });

        // 监听消息事件，处理 API 响应
        sock.on('message', function (data) {
            if (!data) {
                reject();
            }
            const obj = JSON.parse(data);
            // 解析 API 响应的 JSON 数据
            if (!obj || !obj.header || obj.header.code != 0) {
                reject();
            }
            // 提取文本消息
            if (!obj.payload) {
                reject();
            }
            const text_list = obj.payload.choices.text;
            // 将文本消息拼接到问题值中
            text_list.forEach((item) => {
                questionValue += item.content;
            });
        });

        // 监听连接关闭事件，将结果通过 resolve 返回
        sock.on('close', function () {
            console.log(questionValue)
            resolve(questionValue);
        });
    }).then((res) => {
        return res
    }, (err) => {
        console.log("spark_chat error ", JSON.stringify(err))
    });
}


const pack_msg = function (msg_list) {
    let text_list = [{role: "system", content: ""}]
    for (let {type, msg} of msg_list) {
        text_list.push({role: type, content: msg})
    }
    return text_list;
}

module.exports = router;