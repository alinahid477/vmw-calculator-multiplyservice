const config = require('../../config');
const logger = require('../../utilities/logger');
// const axios = require('axios');
const qs = require('form-data');

exports.multiply = async (req, res) => {
    return res.success({ result: req.a * req.b });
};





exports.experimentEnvrionmentVariables = async (req, res) => {
  console.log('in experiment env vars');
  console.log('env', config.nodeEnv, config.firebaseDBConfig);
  
};