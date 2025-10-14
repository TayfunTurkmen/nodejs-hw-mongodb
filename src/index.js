import dotenv from "dotenv";
dotenv.config();

import { setupServer } from "./server.js";
import initMongoConnection from "./db/initMongoConnection.js";

async function main() {
  await initMongoConnection();

  const app = setupServer();
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}

main();