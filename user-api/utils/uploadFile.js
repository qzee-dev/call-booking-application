require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// ✅ Ensure Mongo URI exists
if (!process.env.MONGO_URI) {
  console.error("❌ Missing MONGO_URI environment variable");
  process.exit(1);
}

// ✅ Initialize the GridFS storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      const filename = "file_" + Date.now();
      req.body.image = filename;

      return {
        bucketName: "images",
        filename,
      };
    }
    return null;
  },
});

// ✅ Create multer upload middleware
const upload = multer({ storage });

module.exports = { upload };