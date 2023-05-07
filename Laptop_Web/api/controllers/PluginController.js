const Plugin = require('../models/Plugin')

class PluginController {
  // POST [/api/admin/plugins]
  async createPlugin(req, res, next) {
    const newLaptop = new Plugin(req.body);
    try {
      const savedPlugin = await newPlugin.save();
      res.status(200).json(savedPlugin);
    } catch (err) {
      next(err);
    }
  }
  // PUT [/api/admin/plugins/:id]
  async updatePlugin(req, res, next) {
    try {
      const updatedPlugin = await Plugin.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedPlugin);
    } catch (err) {
      next(err);
    }
  }
  // DELETE [/api/admin/plugins/:id]
  async deletePlugin(req, res, next) {
    try {
      await Plugin.delete({ _id: req.params.id });
      res.status(200).json("Plugin is moved to trash");
    } catch (err) {
      next(err);
    }
  }

  // DELETE [/api/admin/plugins/:id/force]
  async destroyPlugin(req, res, next) {
    try {
      await Plugin.deleteOne({ _id: req.params.id });
      res.status(200).json("Plugin has been deleted");
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/plugins/:id]
  async getPlugin(req, res, next) {
    try {
      const plugin = await Plugin.findById(req.params.id);
      res.status(200).json(plugin);
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/plugins]
  async getPlugins(req, res, next) {
    try {
      const plugins = await Plugin.find();
      res.status(200).json(plugins);
    } catch (err) {
      next(err);
    }
  }
}


module.exports = new PluginController();