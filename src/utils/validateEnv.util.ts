import { requiredEnvVars } from "../configs/requiredEnv";
import logger from "../configs/logger";

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  logger.error(
    `Missing the following environment variables: ${missingEnvVars.join(", ")}`
  );
  process.exit(1);
} else {
  logger.info("All required environment variables are set.");
}
