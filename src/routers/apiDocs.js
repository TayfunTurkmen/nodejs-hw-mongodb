import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const router = express.Router();

// docs/swagger.json dosyasını oku
const swaggerPath = path.resolve("./docs/swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

// Swagger UI rotası
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
