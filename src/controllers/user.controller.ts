import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { generateToken } from "../configs/jwt";
import logger from "../configs/logger"; // Logging
import { User } from "../models/user.model";
import { ResponseHandler } from "../utils/handleResponse.util";
import { IUser } from "../types/user.interface";
import { UserDto } from "../dtos/user.dto";
import { UserRole } from "../enums/useRole.enum";

export class UserController {
  userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;

      // Check if email or username already exists
      const existingUser = await User.findOne({
        $or: [{ email: email }],
      });
      if (existingUser) {
        ResponseHandler.sendErrorResponse(
          res,
          "We found an account with this email. Please login",
          400
        );
        return;
      }

      const user = new User({
        id: username,
        name: username,
        email: email,
        password: await bcrypt.hash(password, 10),
        role: UserRole.User,
      });
      await user.save();

      ResponseHandler.sendSuccessResponse(
        res,
        {
          message: "User registered successfully",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        "User Created!!",
        201,
        false
      );
    } catch (error) {
      logger.error("User signup error:", error);
      ResponseHandler.sendErrorResponse(
        res,
        "Error occured while adding the user."
      );
    }
  };
}
