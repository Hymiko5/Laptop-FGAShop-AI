const AuthController = require("../controllers/AuthController");
const router = require('express').Router();
const { verifyAdmin } = require('../utils/verifyToken');

router.post("/register", verifyAdmin, AuthController.register);
router.post("/login", AuthController.login);


module.exports = router;