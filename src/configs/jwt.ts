import jwt, { JwtPayload } from "jsonwebtoken";

// Generate a short-lived access token for user authentication
const generateToken = (userId: string, timeOut?: string): string => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "WBLpO023LtRw9PJAS82oYzT0XxaWWOceFnPVQqKUIWc=",
    {
      expiresIn: timeOut || process.env.JWT_EXPIRES_IN || "15m", // Defaults to 15 minutes if not specified
    }
  );
};

// Generate a long-lived refresh token to issue new access tokens
const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET ||
      "WBLpO023LtRw9PJAS82oYzT0XxaWWOceFnPVQqKUIWc=",
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d", // Defaults to 7 days
    }
  );
};

// Validate the access token to check its authenticity and expiration
const validateToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || "WBLpO023LtRw9PJAS82oYzT0XxaWWOceFnPVQqKUIWc="
    );
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

// Validate the refresh token to check its authenticity and expiration
const validateRefreshToken = (refreshToken: string): JwtPayload | string => {
  try {
    return jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET ||
        "WBLpO023LtRw9PJAS82oYzT0XxaWWOceFnPVQqKUIWc="
    );
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

// Refresh both access and refresh tokens when the refresh token is valid
const refreshTokens = (
  refreshToken: string
): { accessToken: string; newRefreshToken: string } => {
  try {
    const decoded = validateRefreshToken(refreshToken) as JwtPayload;

    // Generate new tokens for the user
    return {
      accessToken: generateToken(decoded.id),
      newRefreshToken: generateRefreshToken(decoded.id),
    };
  } catch (error) {
    throw new Error("Could not refresh tokens");
  }
};

export {
  generateToken,
  generateRefreshToken,
  validateToken,
  validateRefreshToken,
  refreshTokens,
};
