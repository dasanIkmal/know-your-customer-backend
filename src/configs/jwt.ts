import jwt, { JwtPayload } from "jsonwebtoken";

const generateToken = (userId: string, timeOut?: string): string => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "WBLpO023LtRw9PJAS82oYzT0XxaWWOceFnPVQqKUIWc=",
    {
      expiresIn: timeOut || process.env.JWT_EXPIRES_IN,
    }
  );
};

const validateToken = (token: string): JwtPayload | string => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "WBLpO023LtRw9PJAS82oYzT0XxaWWOceFnPVQqKUIWc="
    );
    return decoded; // This will return the payload of the token
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export { generateToken, validateToken };
