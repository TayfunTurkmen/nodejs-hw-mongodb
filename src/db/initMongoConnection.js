const mongoose = require('mongoose');

async function initMongoConnection() {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;

  if (!MONGODB_URL || !MONGODB_DB) {
    throw new Error('Missing MONGODB_URL or MONGODB_DB in env');
  }

  const auth =
    MONGODB_USER && MONGODB_PASSWORD
      ? `${encodeURIComponent(MONGODB_USER)}:${encodeURIComponent(MONGODB_PASSWORD)}@`
      : '';

  const uri = `mongodb+srv://${auth}${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Mongo connection successfully established!');
}

module.exports = initMongoConnection;
