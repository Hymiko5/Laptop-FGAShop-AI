const PluginController = require("../controllers/PluginController");
const router = require('express').Router();
const { verifyAdmin } = require('../utils/verifyToken');
//CREATE
router.post("/", verifyAdmin, PluginController.createPlugin);

//UPDATE
router.put("/:id", verifyAdmin, PluginController.updatePlugin);

//DELETE
router.delete("/:id", verifyAdmin, PluginController.deletePlugin);

//DESTROY
router.delete("/:id/force", verifyAdmin, PluginController.destroyPlugin);

//GET LAPTOP
router.get("/:id", verifyAdmin, PluginController.getPlugin);

//GET LAPTOPS
router.get("/", verifyAdmin, PluginController.getPlugins);

module.exports = router;