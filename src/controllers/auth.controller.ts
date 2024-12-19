import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { generateToken } from "../configs/jwt";
import { ResponseHandler } from "../utils/handleResponse.util";

export class AuthController {
  userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return ResponseHandler.sendErrorResponse(
          res,
          "Invalid email or password",
          401
        );
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return ResponseHandler.sendErrorResponse(
          res,
          "Invalid email or password",
          401
        );
      }

      // Generate JWT
      const token = generateToken(user.id);

      ResponseHandler.sendSuccessResponse(
        res,
        {
          message: "Login successful",
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        "Login successful!!",
        200,
        false
      );
    } catch (error) {
      console.error("Login error:", error);
      ResponseHandler.sendErrorResponse(res, "Error during login", 500);
    }
  };
}
