const { plugin } = require('mongoose');
const Plugin = require('../models/Plugin')
const uploadSeaweed = require("../middlewares/fileExtension");

class PluginController {
  // POST [/api/admin/plugins]
  async createPlugin(req, res, next) {
    const fileName = new Date().valueOf().toString();
    const url = "http://10.9.3.50:8888";
    const folder = "LaptopAI";
    const response = await uploadSeaweed(req.file, url, folder, fileName);
    if(response) {
      try {
        req.body.image = response;
        const newPlugin = new Plugin(req.body);
        const savedPlugin = await newPlugin.save();
        res.status(200).json(savedPlugin);
      } catch (err) {
        next(err);
      }
    }
    
  }
  // PUT [/api/admin/plugins/:id]
  async updatePlugin(req, res, next) {
    const fileName = new Date().valueOf().toString();
    const url = "http://10.9.3.50:8888";
    const folder = "LaptopAI";
    const response = await uploadSeaweed(req.file, url, folder, fileName);
    if(response) {
      try {
        req.body.image = response;
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

  // GET [/api/admin/plugins/title]
  async getPluginTitles(req, res, next) {
    try {
      const plugins = await Plugin.find().select('name');
      res.status(200).json(plugins);
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

  

  // GET [/api/admin/plugins/search]
  async searchPlugins(req, res, next) {
    const { keywords } = req.query;
    try {
      const plugins = await Plugin.find({ "name": { $regex: new RegExp(keywords, "i") }});
      res.status(200).json(plugins);
    } catch (err) {
      next(err);
    }
  }
}


module.exports = new PluginController();