const FileController = require("../controllers/FileController");
const router = require('express').Router();
const { verifyAdmin } = require('../utils/verifyToken');
const multer  = require('multer');
const upload = multer();
// UPLOAD FILE
router.post("/upload", verifyAdmin, upload.single('file'), FileController.upload);


module.exports = router;