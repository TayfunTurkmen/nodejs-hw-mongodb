import { startServer } from "./server.js";
import { connectToMongoDB } from "./db/initMongoConnection.js";

const bootstrap = async () => {
    await connectToMongoDB();
    startServer();
};

bootstrap();