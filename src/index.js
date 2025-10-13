require('dotenv').config();
const initMongoConnection = require('./db/initMongoConnection');
const setupServer = require('./server');

async function start() {
  try {
    await initMongoConnection();
    setupServer(); // Express server başlatılıyor
  } catch (err) {
    console.error('Failed to start app', err);
    process.exit(1);
  }
}

start();
