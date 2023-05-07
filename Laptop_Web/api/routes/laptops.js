const LaptopController = require("../controllers/LaptopController");
const router = require('express').Router();
const { verifyAdmin } = require('../utils/verifyToken');
//CREATE
router.post("/", verifyAdmin, LaptopController.createLaptop);

//UPDATE
router.put("/:id", verifyAdmin, LaptopController.updateLaptop);

//DELETE
router.delete("/:id", verifyAdmin, LaptopController.deleteLaptop);

//DESTROY
router.delete("/:id/force", verifyAdmin, LaptopController.destroyLaptop);

//GET LAPTOP
router.get("/:id", LaptopController.getLaptop);

//GET LAPTOPS
router.get("/", LaptopController.getLaptops);

module.exports = router;