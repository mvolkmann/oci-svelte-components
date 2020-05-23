const expressPino = require('express-pino-logger');
const fs = require('fs');
const pino = require('pino');

// This is how frequently we will check to see if log rotation is needed.
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

// This the maximum log file size before it is rotated.
const MAX_MB = 5;

const logPathPrefix = './osc-server';
const logPath = logPathPrefix + '.log';
const logDest = pino.destination(logPath);

const PINO_OPTIONS = {
  level: 'info', // desired logging level
  redact: ['req.headers'] // JSON properties to exclude from logging
};

function debug(req, operation, message) {
  console.debug(message);
  req.log.debug({message, operation});
}

function error(req, operation, message) {
  console.error(message);
  req.log.error({message, operation});
}

function fatal(req, operation, message) {
  console.error(message);
  req.log.fatal({message, operation});
}

function info(req, operation, message) {
  console.info(message);
  req.log.info({message, operation});
}

function setup(app) {
  app.use(expressPino({...PINO_OPTIONS, logger: pino(logDest)}));

  setInterval(() => {
    if (isLogFileTooBig(logPath)) {
      // Get timestamp without sub-seconds and timezone.
      let timestamp = new Date().toISOString();
      timestamp = timestamp.substring(0, timestamp.indexOf('.'));

      const newLogPath = `${logPathPrefix}.${timestamp}.log`;
      console.info('rotating log file to', newLogPath);

      // Rename the old log file.
      fs.renameSync(logPath, newLogPath);

      // Start over with a new log file.
      logDest.reopen();
    }
  }, CHECK_INTERVAL);
}

function trace(req, operation, message) {
  console.trace(message);
  req.log.trace({message, operation});
}

function warn(req, operation, message) {
  console.warn(message);
  req.log.warn({message, operation});
}

function isLogFileTooBig(filePath) {
  const stats = fs.statSync(filePath);
  const bytes = stats['size'];
  const megabytes = bytes / 1000000;
  return megabytes > MAX_MB;
}

module.exports = {
  debug,
  error,
  fatal,
  info,
  setup,
  trace,
  warn
};
