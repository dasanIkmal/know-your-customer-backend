import { Request, Response, NextFunction } from "express";
import logger from "../configs/logger";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack); // Log the stack trace of the error
  logger.error("err.message"); // Log the error message
  res.status(err.status || 500).json({
    message: err.message || "An unexpected error occurred",
    // Include the stack trace in the response if in development mode
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
