const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('../utils/asyncHandler');
const uploadController = require('../controllers/uploadsController');
const auth = require('../middleware/auth');

// multer's diskStorage does NOT create the destination folder for you — if it
// doesn't exist yet (e.g. first run, fresh clone) every upload fails with an
// ENOENT error. Make sure it's there before we ever try to write to it.
const uploadsDir = path.join(__dirname, '../../uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
]);
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB per file

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${path.extname(file.originalname)}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return cb(new Error('Unsupported file type. Only JPEG, PNG, WEBP, GIF, and PDF are allowed.'));
    }
    return cb(null, true);
  },
});

router.post('/', auth, upload.array('files', 10), asyncHandler(uploadController.uploadFiles));

module.exports = router;
