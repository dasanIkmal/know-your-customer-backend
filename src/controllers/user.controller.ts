import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import logger from "../configs/logger";
import { User } from "../models/user.model";
import { Document } from "../models/document.model";
import { UserRole } from "../enums/useRole.enum";
import mongoose from "mongoose";
import { Upload } from "@aws-sdk/lib-storage";
import s3 from "../configs/s3";

export class UserController {
  // Handles user signup and saves the new user to the database
  userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;

      // Check if an account with the given email already exists
      const existingUser = await User.findOne({
        $or: [{ email: email }],
      });
      if (existingUser) {
        res.status(403).json({
          message: "We found an account with this email. Please login",
          status: 403,
        });
        return;
      }

      // Create a new user and hash their password
      const user = new User({
        id: username,
        name: username,
        email: email,
        password: await bcrypt.hash(password, 10),
        role: UserRole.User,
      });
      await user.save();

      res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error) {
      logger.error("User signup error:", error);
      res.status(500).json({
        message: "Error occurred while adding the user.",
      });
    }
  };

  // Handles document submission by uploading the file to S3 and saving metadata to the database
  submitDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { documentName, userId } = req.body;

      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: "Document file is required" });
        return;
      }

      const fileKey = `kyc-documents/${userId}/${Date.now()}_${
        req.file.originalname
      }`;

      // Upload file to AWS S3 bucket
      const upload = new Upload({
        client: s3,
        params: {
          Bucket: process.env.AWS_S3_BUCKET_NAME || "kyc-bucket-dasan",
          Key: fileKey,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        },
      });

      const uploadResult = await upload.done();

      // Save document metadata to the database
      const document = new Document({
        userId: userId,
        documentUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
        documentName: documentName || req.file.originalname,
      });

      await document.save();

      res.status(201).json({
        message: "Document uploaded successfully!",
        document: document,
      });
    } catch (error) {
      console.error("Error uploading document:", error);
      res.status(500).json({ message: "Error uploading document" });
    }
  };

  // Fetch all documents for a specific user
  getAllDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.params.id);

      const documents = await Document.find({ userId: userId });

      res.status(200).json({
        documents: documents,
      });
    } catch (error) {
      logger.error("Get all documents error:", error);
      res.status(500).json({
        message: "Error occurred while fetching the documents.",
      });
    }
  };
}
