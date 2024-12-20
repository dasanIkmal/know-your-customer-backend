import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss", // Standardized timestamp format
    }),
    winston.format.json(),
    winston.format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${info.message} ${JSON.stringify(
          info.meta
        )}` // Custom log message format
    )
  ),
  transports: [
    new winston.transports.File({ filename: "log/error.log", level: "error" }), // Log only errors to error.log
    new winston.transports.File({ filename: "log/combined.log" }), // Log all levels to combined.log
  ],
});

// Add a console transport in non-production environments
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorize console logs for better readability
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}` // Simplified console log format
        )
      ),
    })
  );
}

export default logger;
