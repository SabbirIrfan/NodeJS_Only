const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routesHandlers/notFoundHandlers');

const handler = {};

handler.handleReqRes = (req, res) => {
    // working with path to help with routes
    const parseUrl = url.parse(req.url, true);
    console.log(parseUrl);
    const path = parseUrl.pathname;
    const trimedPath = path.replace(/^\/+|\/+$/g, '');
    console.log(trimedPath);
    const method = req.method.toLowerCase();
    const querryStringObject = parseUrl.query;
    const headerObject = req.headers;

    // console.log(method, querryStringObject, headerObject);
    const requestProperties = {
        parseUrl,
        path,
        trimedPath,
        method,
        querryStringObject,
        headerObject,
    };

    /// working with routes
    const choosenHandlers = routes[trimedPath] ? routes[trimedPath] : notFoundHandler;
    // need to understand this callback function
    choosenHandlers(requestProperties, (statusCode, payload) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payload = typeof payload === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        // return the final response

        res.writeHead(statusCode);
        res.end(payloadString);
    });
    // working with req to help with receiving body in post routes

    /// decoder _> a node method

    const decoder = new StringDecoder('utf-8');

    let bodyData = '';

    req.on('data', (buffer) => {
        bodyData += decoder.write(buffer);
    });

    req.on('end', () => {
        bodyData += decoder.end();
        console.log(bodyData);
        res.end('<p> hows <h1>world</h1></p>'); /// note why res.end is inside the req.on?
        // because the res.end will fire and the event will be lost before we can get all the
        // buffer in req.on as it is asycronous(i guess)
    });
};

module.exports = handler;
