const UserController = require("../controllers/UserController");
const router = require('express').Router();
const { verifyAdmin } = require('../utils/verifyToken');
const multer  = require('multer');
const upload = multer();

//CREATE
router.post("/", verifyAdmin, upload.single('photo'), UserController.createUser);

//UPDATE
router.put("/:id", verifyAdmin, upload.single('photo'), UserController.updateUser);

//DELETE
router.delete("/:id", verifyAdmin, UserController.deleteUser);

//DESTROY
router.delete("/:id/force", verifyAdmin, UserController.destroyUser);

//GET USERS SEARCH
router.get("/search",UserController.searchUsers);

//GET USERS
router.get("/", verifyAdmin, UserController.getUsers);

//GET COUNT
router.get("/count", verifyAdmin, UserController.countUsers);

//GET USER
router.get("/:id", verifyAdmin, UserController.getUser);



module.exports = router;