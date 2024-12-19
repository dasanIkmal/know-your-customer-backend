import dotenv from "dotenv";
dotenv.config();

import logger from "./configs/logger";
import "./utils/validateEnv.util";
import app from "./server";
import connectDB from "./configs/db";
import errorHandler from "./middleware/error.handler";

const port = process.env.PORT || 4000;

connectDB();
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
