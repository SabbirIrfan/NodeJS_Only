const { sampleHandler } = require('./handlers/routesHandlers/sampleHandlers');
const { userHandler } = require('./handlers/routesHandlers/userHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
};

module.exports = routes;
