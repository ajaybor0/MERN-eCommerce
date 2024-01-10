import path from 'path';
import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

export default router;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    // To accept the file pass `true`, like so:
    cb(null, true);
  } else {
    // To reject this file pass `false`, like so:
    cb('Images only!');
  }
};

const upload = multer({ storage, fileFilter }).single('image');

router.post('/', upload, (req, res) => {
  console.log(req.file);
  res.send({
    message: 'Image uploaded',
    imageUrl: `/${req.file.path}`
  });
});
