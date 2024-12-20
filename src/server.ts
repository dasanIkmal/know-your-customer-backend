import cors from "cors";
import express from "express";

import appRouter from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/", appRouter);

export default app;
