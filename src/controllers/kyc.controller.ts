import { Request, Response } from "express";
import { Document } from "../models/document.model";
import logger from "../configs/logger";
import mongoose from "mongoose";
import { User } from "../models/user.model";

export class KycController {
  // Fetch all KYC documents
  getAllKyc = async (req: Request, res: Response) => {
    try {
      const documents = await Document.find();
      res.status(200).json({
        documents: documents,
      });
    } catch (error) {
      logger.error("Get all KYC documents error:", error);
      res.status(500).json({
        message: "Error during get all KYC documents",
      });
    }
  };

  // Approve a KYC document by ID
  approveKyc = async (req: Request, res: Response) => {
    try {
      const { id, name } = req.params;

      // Validate the document ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
          message: "Invalid document ID format",
        });
        return;
      }

      const documentId = new mongoose.Types.ObjectId(id);

      // Check if the document exists
      const document = await Document.findById(documentId);
      if (!document) {
        res.status(404).json({
          message: "Document not found",
        });
        return;
      }

      // Update document status to approved and set approver name
      document.status = "approved";
      document.approvedBy = name;
      await document.save();

      res.status(200).json({
        message: "Document approved successfully",
      });
    } catch (error) {
      logger.error("Approve KYC documents error:", error);
      res.status(500).json({
        message: "Error during approve KYC documents",
      });
    }
  };

  // Reject a KYC document by ID
  rejectKyc = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { name, reason } = req.body;

      // Validate the document ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
          message: "Invalid document ID format",
        });
        return;
      }

      const documentId = new mongoose.Types.ObjectId(id);

      // Check if the document exists
      const document = await Document.findById(documentId);
      if (!document) {
        res.status(404).json({
          message: "Document not found",
        });
        return;
      }

      // Update document status to rejected, set approver name, and add rejection reason
      document.status = "rejected";
      document.approvedBy = name;
      document.rejectionReason = reason;
      await document.save();

      res.status(200).json({
        message: "Document rejected successfully",
      });
    } catch (error) {
      logger.error("Reject KYC documents error:", error);
      res.status(500).json({
        message: "Error during reject KYC documents",
      });
    }
  };

  // Get statistics for documents and users
  getStats = async (req: Request, res: Response) => {
    try {
      // Count documents by their statuses
      const totalDocuments = await Document.countDocuments();
      const approvedDocuments = await Document.countDocuments({
        status: "approved",
      });
      const pendingDocuments = await Document.countDocuments({
        status: "pending",
      });
      const rejectedDocuments = await Document.countDocuments({
        status: "rejected",
      });

      // Count total users
      const totalUsers = await User.countDocuments();

      res.status(200).json({
        message: "Statistics fetched successfully",
        stats: {
          allDocuments: totalDocuments,
          approvedDocuments: approvedDocuments,
          pendingDocuments: pendingDocuments,
          rejectedDocuments: rejectedDocuments,
          allUsers: totalUsers,
        },
      });
    } catch (error) {
      logger.error("Error fetching stats:", error);
      res.status(500).json({
        message: "Error fetching statistics",
      });
    }
  };

  // Fetch all users
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json({
        users: users,
      });
    } catch (error) {
      logger.error("Error fetching users:", error);
      res.status(500).json({
        message: "Error fetching users",
      });
    }
  };
}
