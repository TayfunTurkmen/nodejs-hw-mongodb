import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pino from "pino-http";
import contactRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js"; // Import authRouter
import errorHandler from "./middlewares/errorHandler.js"; 
import cookieParser from "cookie-parser";
import notFoundHandler from "./middlewares/notFoundHandler.js";

dotenv.config(); 

const startServer = () => {

    const app = express();

    const PORT = process.env.PORT || 3000;
    // Middleware
    app.use(cookieParser());
    app.use(express.json());
    app.use(cors());

    // Pino logger middleware
    app.use(
        pino({
            transport: {
                target: "pino-pretty",
            }
        })
    );

    app.get("/", (req, res) => {
        req.log.info("Ana sayfa ziyaret edildi"); // log örneği
        res.send("Merhaba Express!");
    });
    app.use("/contacts", contactRouter);
    app.use("/auth", authRouter);

    // 404 error handling
    app.use(notFoundHandler);
    // Error handling middleware
    app.use(errorHandler);

    app.listen(PORT, () => {
    console.log("localhost:Server is running on ", "http://localhost:3000");
    });
};

export { startServer };
