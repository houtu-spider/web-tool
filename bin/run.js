const {new_app} = require('app');
const debug = require('debug')('web-express:server');
const http = require('http');
const https = require('https');
const web_tool_config = require('../web_tool_config.js');
const fs =require('fs');
const express = require('express');

for (let server_cfg of web_tool_config.server) {
    const {name, port: server_port, ssl} = server_cfg;
    const default_port = ssl ? web_tool_config.default_https_port : web_tool_config.default_http_port;
    const port = normalizePort(server_port || default_port);
    const server_app = new_app(express());
    server_app.set('port', port);

    let server;
    if (ssl) {
        // https
        const https_options = {
            key: fs.readFileSync(web_tool_config.https_options[name].key),
            cert: fs.readFileSync(web_tool_config.https_options[name].cert)
        };

        server = https.createServer(https_options, server_app);

    } else {
        server = http.createServer(server_app);
    }

    server.listen(port, '0.0.0.0');
    server.on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    })

    server.on('listening', () => {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    });
}

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return 0;
}