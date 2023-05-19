const LaptopController = require("../controllers/LaptopController");
const Laptop = require("../models/Laptop");
const router = require('express').Router();
const { verifyAdmin } = require('../utils/verifyToken');
const multer  = require('multer');
const upload = multer();

//CREATE
router.post("/", verifyAdmin, upload.array('thumnail', 12), LaptopController.createLaptop);

//UPDATE
router.put("/:id", verifyAdmin, upload.array('thumnail', 12), LaptopController.updateLaptop);

//DELETE
router.delete("/:id", verifyAdmin, LaptopController.deleteLaptop);

//DESTROY
router.delete("/:id/force", verifyAdmin, LaptopController.destroyLaptop);

//GET LAPTOPS SEARCH
router.get("/search", LaptopController.searchLaptops);

//GET LAPTOP
router.get("/:id", LaptopController.getLaptop);

//GET LAPTOPS
router.get("/", LaptopController.getLaptops);



module.exports = router;