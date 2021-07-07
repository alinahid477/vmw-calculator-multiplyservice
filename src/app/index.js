const healthcheckRouter = require('./healthcheck/router');
const authRouter = require('./functions/router');

module.exports = (app) => {
  app.use('/healthcheck', healthcheckRouter);
  app.use('/functions', authRouter);
};