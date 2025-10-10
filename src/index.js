import { setupServer } from './server.js';
import initMongoConnection from './db/initMongoConnection.js';
const startServer = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();
