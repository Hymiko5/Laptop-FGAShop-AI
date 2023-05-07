const OrderController = require("../controllers/OrderController");
const router = require('express').Router();
const { verifyAdmin } = require('../utils/verifyToken');


// GET TOTAL REVENUE 6 MONTH
router.get("/revenue/6-months", OrderController.getSixMonthRevenue);

// GET LATEST TRANSACTION
router.get("/latest", OrderController.getLatestTransaction);

// GET TOTAL REVENUE
router.get("/revenue", OrderController.getRevenue);

//DELETE
router.delete("/:id", verifyAdmin, OrderController.deleteOrder);

//DESTROY
router.delete("/:id/force", verifyAdmin, OrderController.destroyOrder);

//GET LAPTOPS
router.get("/", verifyAdmin, OrderController.getOrders);

//GET COUNT

router.get("/count", verifyAdmin, OrderController.countOrders);

//GET LAPTOP
router.get("/:id", verifyAdmin, OrderController.getOrder);

module.exports = router;