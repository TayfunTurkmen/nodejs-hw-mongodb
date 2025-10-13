require('dotenv').config();
const express = require('express');
const contactsRouter = require('./routers/contacts');
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

function setupServer() {
  const app = express();

  app.use(express.json());

  // Routers
  app.use('/api/contacts', contactsRouter);

  // Alternatif route (isteğe bağlı)
  app.use('/contacts', contactsRouter);

  // Health check
  app.get('/', (req, res) => {
    res.json({ message: 'API is running ' });
  });

  // 404 handler
  app.use(notFoundHandler);

  // Global error handler
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = setupServer;
