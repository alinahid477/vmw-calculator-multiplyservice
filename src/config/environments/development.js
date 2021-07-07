module.exports = {
    host: '127.0.0.1',
    port: process.env.PORT, // change with development port
  
    logLevel: process.env.LOG_LEVEL, // can be chenged to error, warning, info, verbose or silly
    allowedOrigins: process.env.ALLOWED_ORIGINS,
  };