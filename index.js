const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
// app object ~ module scaffolding

const app = {};

// config

app.config = {
    port: 3000,
};

// create server

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
};

// handle request
app.handleReqRes = handleReqRes;

// start sever
app.createServer();
