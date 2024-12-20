import { Request, Response, NextFunction } from "express";
import logger from "../configs/logger";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error stack trace and message for debugging
  logger.error(err.stack);
  logger.error(err.message);

  // Respond with a generic or specific error message
  res.status(err.status || 500).json({
    message: err.message || "An unexpected error occurred",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Provide stack trace only in development
  });
};

export default errorHandler;
