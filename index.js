const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
// app object ~ module scaffolding

const app = {};

// // config handeled by environment

// app.config = {
//     port: 3000,
// };

// create server

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to port ${environment.port}`);
    });
};
// handle request
app.handleReqRes = handleReqRes;

// start sever
app.createServer();
