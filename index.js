const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const data = require('./lib/data');
// app object ~ module scaffolding

const app = {};
//  testing file system
// write
// data.create('test', 'test', { name: 'sabbir' }, (err) => {
//     console.log(err);
// });
// Read
// data.read('test', 'test', (err, fileData) => {
//     if (!err) {
//         console.log(fileData);
//     } else console.log(err);
// });
// update
// data.update('test', 'test', { name: 'newSabbir', age: '28', obostha: 'jobless' }, (err) => {
//     console.log(err);
// });
// delete
// data.delete('test', 'test', (err) => {
//     if (err) {
//         console.log(err);
//     } else console.log('success');
// });
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
