// dependencies
const crypto = require('crypto');
const environments = require('./environment');
// module scafholdings

const utilities = {};
// parse json string to object
utilities.parseJSON = (jsonString) => {
    let output = {};

    try {
        output = JSON.parse(jsonString);
    } catch (error) {
        console.log('parsing could no be done in the utilities');
        output = {};
    }

    return output;
};

// hashing pass or string
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', environments.secretKey).update(str).digest('hex');

        return hash;
    }

    return false;
};
module.exports = utilities;
