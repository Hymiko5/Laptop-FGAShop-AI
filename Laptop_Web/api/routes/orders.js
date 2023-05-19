const OrderController = require("../controllers/OrderController");
const router = require('express').Router();
const { verifyAdmin } = require('../utils/verifyToken');

router.put("/:id", OrderController.updateOrder);

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

//GET ORDER INFO
router.get("/:id/info", OrderController.getOrdersInfo);

//GET ORDER SEARCH
router.get("/search", OrderController.searchOrders);

//GET ORDERS
router.get("/", verifyAdmin, OrderController.getOrders);

//GET COUNT

router.get("/count", verifyAdmin, OrderController.countOrders);

//GET ORDER
router.get("/:id", verifyAdmin, OrderController.getOrder);



module.exports = router;