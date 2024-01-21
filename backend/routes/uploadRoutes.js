import express from 'express';
import { check } from 'express-validator';
import multer from 'multer';
import validateRequest from '../middleware/validator.js';

const router = express.Router();

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

const validator = {
  upload: [
    check('file').notEmpty().withMessage("Invalid file")
  ]
}

router.post('/', validator.upload, validateRequest, upload, (req, res) => {
  console.log(req.file);
  res.send({
    message: 'Image uploaded',
    imageUrl: `/${req.file.path}`
  });
});

export default router;
