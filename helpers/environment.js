/* eslint-disable prettier/prettier */
/* eslint-disable operator-linebreak */
// dependencies

// module scafholdings

const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'habijabibababa',
};

environments.production = {
    port: 5000,
    envName: 'productions',
    secretKey: 'doublehabijabihabjaiahbai',
};
// determine which env was passed from the command line

const currentEnv = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export the env and check if it is given
const exportEnv =
    typeof environments[currentEnv] === 'object'
    ? environments[currentEnv]
    : environments.staging;

module.exports = exportEnv;
