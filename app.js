const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const serverFavicon = require('serve-favicon')

const indexRouter = require('./routes/index');
const menu = require('./routes/menu')
const detail = require('./routes/detail')
const timestamp_covert = require('./routes/detail/timestamp_covert')
const send_me_message = require('./routes/detail/send_me_message')
const spider_chat = require('./routes/detail/spider_chat')
const ejs = require('ejs').__express

function new_app(app) {
    app.set('views', path.join(__dirname, 'views'));

    app.set('view engine', 'ejs');
    app.engine('ejs', ejs);
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(serverFavicon(path.join(__dirname, 'favicon.ico')));

    app.use('/', indexRouter);
// 详情
    app.use('/detail', detail);
// 菜单页
    app.use('/menu', menu);
// 时间戳转换
    app.use('/timestamp_covert', timestamp_covert);
// 发送消息
    app.use('/send_me_message', send_me_message);
// spider_chat
    app.use('/spider_chat', spider_chat);

    app.use(function (req, res, next) {
        next(createError(404));
    });

    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
    return app;
}

module.exports = {
    new_app,
};