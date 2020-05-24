const cors = require('cors');
const express = require('express');
const logger = require('./logger');
const transactionsApi = require('./transactions');

const [, , port] = process.argv;

const app = express();
//app.use(express.static(storageDir));
app.use(express.json());
logger.setup(app);
app.use(cors());

// This is for testing the Table component.
app.use('/transactions', transactionsApi);

const usePort = port || 4001;
app.listen(usePort, err => {
  if (err) {
    console.error('error starting server', err);
  } else {
    console.info('listening on port', usePort);
  }
});
