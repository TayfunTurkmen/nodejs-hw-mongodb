import { TEMP_FOLDER, UPLOAD_FOLDER } from './constant/constantContact.js';
import { initMongoConnection } from './db/initMongoConnection';
import { setupServer } from './server';
import { createFileIfNotExist } from './utils/createFileIfNotExist.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createFileIfNotExist(UPLOAD_FOLDER);
  await createFileIfNotExist(TEMP_FOLDER);
  setupServer();
};

bootstrap();
