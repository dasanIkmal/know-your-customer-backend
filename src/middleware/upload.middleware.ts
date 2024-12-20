import multer from "multer";

const storage = multer.memoryStorage(); // Store the file in memory instead of saving it to disk

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    // Allow only specific file types
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf, .doc, and .docx files are allowed")); // Reject unsupported file types
    }
  },
});

export default upload.single("file"); // Bind the middleware to the form-data field named "file"
