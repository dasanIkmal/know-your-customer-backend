import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import appRouter from "./routes";
import { swaggerSpec } from "./configs/swagger";

const app = express();

app.use(express.json());
app.use(cors());

// Routes
//use this to get swagger docs json to import to postmon
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", appRouter);

export default app;
