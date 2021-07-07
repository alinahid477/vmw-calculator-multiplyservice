const env = process.env.NODE_ENV || 'development';

const config = require(`./environments/${env.toLowerCase()}`); //eslint-disable-line

config.allowedOrigins = config.allowedOrigins.split(',');

console.log(config);

module.exports = config;