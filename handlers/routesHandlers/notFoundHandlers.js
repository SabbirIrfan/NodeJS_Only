// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, clallback) => {
    clallback(404, {
        message: 'Your requested url does not exist',
    });
};
module.exports = handler;
