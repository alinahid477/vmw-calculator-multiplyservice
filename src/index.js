const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const customResponses = require('./middlewares/customResponses');
const logger = require('./utilities/logger');

const app = express();
const port = process.env.PORT || config.port;
const ENV = process.env.NODE_ENV || config.env;

app.set('env', ENV);
app.use(
  cors({
    exposedHeaders: [
      'Origin',
      'X-Requested-With',
      'x-access-token',
      'x-refresh-token',
    ],
    origin: (origin, callback) => {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) {
        return callback(null, true);
      }
      if (config.allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.${origin}`;
        console.log(msg);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(helmet());
//app.use(cookieParser(config.cookieSignKey));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(customResponses);

require('./app')(app); //eslint-disable-line

app.use((req, res) => {
  res.notFound();
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  next(err);
});

// Don't remove next !!!!
// prettier-ignore
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(503).json({
    success: false,
    error: 'server_error',
  });
});

app.listen(port, () => {
  logger.info(`Backend started and listening on port ${port}`);
});
