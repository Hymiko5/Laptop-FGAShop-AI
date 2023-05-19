const PluginController = require("../controllers/PluginController");
const router = require('express').Router();
const { verifyAdmin } = require('../utils/verifyToken');
const multer  = require('multer');
const upload = multer();
//CREATE
router.post("/", verifyAdmin, upload.single('image'), PluginController.createPlugin);

//UPDATE
router.put("/:id", verifyAdmin, upload.single('image'), PluginController.updatePlugin);

//DELETE
router.delete("/:id", verifyAdmin, PluginController.deletePlugin);



//DESTROY
router.delete("/:id/force", verifyAdmin, PluginController.destroyPlugin);

router.get("/search", PluginController.searchPlugins);

router.get("/title", PluginController.getPluginTitles);

//GET PLUGIN
router.get("/:id", verifyAdmin, PluginController.getPlugin);

//GET PLUGINS
router.get("/", verifyAdmin, PluginController.getPlugins);


module.exports = router;