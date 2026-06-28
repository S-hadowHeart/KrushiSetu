const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadsController');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${path.extname(file.originalname)}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

router.post('/', auth, upload.array('files', 10), uploadController.uploadFiles);

module.exports = router;
