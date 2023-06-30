/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;
    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length >= 5
            ? requestProperties.body.password
            : false;
    const tosAgreement =
        typeof requestProperties.body.tosAgreement === 'boolean'
            ? requestProperties.body.tosAgreement
            : false;
    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that the user is not already exist
        data.read('users', phone, (err, user) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };
                // store in database
                data.create('users', phone, userObject, (err1) => {
                    if (!err1) {
                        callback(200, {
                            message: 'User was created successfully',
                        });
                    } else {
                        callback(500, {
                            error: 'User was created successfully',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'there was a problem in server side',
                });
            }
        });
    } else {
        callback(400, {
            error: 'you have a problem with your request',
        });
    }
};
handler._users.get = (requestProperties, callback) => {
    const userId = requestProperties.querryStringObject;
    console.log(userId.id);

    callback(200);
};
handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;
