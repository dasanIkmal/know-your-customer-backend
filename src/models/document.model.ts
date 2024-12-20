import { Schema, model } from "mongoose";

const DocumentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Links the document to the user who uploaded it
      required: true,
    },
    documentUrl: {
      type: String,
      required: true, // S3 URL of the uploaded document
    },
    documentName: {
      type: String, // Name of the document provided by the user or default from file metadata
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // Initial status of the document
    },
    uploadedAt: {
      type: Date,
      default: Date.now, // Time the document was uploaded
    },
    approvedBy: {
      type: String,
      ref: "User", // Tracks the admin who approved/rejected the document
      default: null,
    },
    rejectionReason: {
      type: String, // Optional reason if the document is rejected
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

export const Document = model("Document", DocumentSchema);
