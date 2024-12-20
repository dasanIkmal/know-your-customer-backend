import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import {
  generateToken,
  generateRefreshToken,
  validateRefreshToken,
} from "../configs/jwt";

export class AuthController {
  // Handle user login and token generation
  userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ message: "No User Found" });
        return;
      }

      // Validate the provided password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      // Generate tokens for the user
      const accessToken = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      res.status(200).json({
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Error during login" });
    }
  };

  // Handle token refresh
  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({ message: "Refresh token is required" });
        return;
      }

      // Validate the provided refresh token
      const decoded = validateRefreshToken(refreshToken);
      const userId = (decoded as any).id;

      // Generate new access and refresh tokens
      const newAccessToken = generateToken(userId);
      const newRefreshToken = generateRefreshToken(userId);

      res.status(200).json({
        message: "Token refreshed successfully",
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      console.error("Refresh token error:", error);
      res.status(401).json({ message: "Invalid or expired refresh token" });
    }
  };
}
