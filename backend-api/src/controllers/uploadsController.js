const path = require('path');
const fs = require('fs');
const HttpError = require('../utils/httpError');

async function uploadFiles(req, res) {
  if (!req.files || req.files.length === 0) throw new HttpError(400, 'No files uploaded');
  const urls = req.files.map((f) => ({ url: `/uploads/${f.filename}`, originalName: f.originalname }));
  res.status(201).json({ ok: true, files: urls });
}

module.exports = { uploadFiles };
