const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('multer');
const mime = require('mime-types');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = mime.extension(file.mimetype);
    cb(null, `${Date.now()}.${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const mimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (mimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post('/', upload.single('image'), postController.addPost);
router.get('/', postController.getPosts);

module.exports = router;
