const { default: mongoose } = require('mongoose');
const Laptop = require('../models/Laptop')
const LaptopType = require('../models/laptopType');
const uploadSeaweed = require("../middlewares/fileExtension");

class LaptopController {
  // POST [/api/admin/laptops]
  async createLaptop(req, res, next) {
    try {
      const url = "http://10.9.3.50:8888";
      const folder = "LaptopAI";
      let promises = req.files.map(async(file) => {
        const fileName = new Date().valueOf().toString();
        const response = await uploadSeaweed(file, url, folder, fileName);
        return response;
        });
      req.body.thumnail = await Promise.all(promises);
      const newLaptop = new Laptop(req.body);
      const savedLaptop = await newLaptop.save();
      res.status(200).json(savedLaptop);
    } catch (err) {
      next(err);
    }
  }
  // PUT [/api/admin/laptops/:id]
  async updateLaptop(req, res, next) {
    try {
      const url = "http://10.9.3.50:8888";
      const folder = "LaptopAI";
      let promises = req.files.map(async(file) => {
        const fileName = new Date().valueOf().toString();
        const response = await uploadSeaweed(file, url, folder, fileName);
        return response;
        });
      req.body.thumnail = await Promise.all(promises);
      const updatedLaptop = await Laptop.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedLaptop);
    } catch (err) {
      next(err);
    }
  }
  // DELETE [/api/admin/laptops/:id]
  async deleteLaptop(req, res, next) {
    try {
      await Laptop.delete({ _id: req.params.id });
      res.status(200).json("Laptop is moved to trash");
    } catch (err) {
      next(err);
    }
  }

  // DELETE [/api/admin/laptops/:id/force]
  async destroyLaptop(req, res, next) {
    try {
      await Laptop.deleteOne({ _id: req.params.id });
      res.status(200).json("Laptop has been deleted");
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/laptops/:id]
  async getLaptop(req, res, next) {
    try {
      const laptop = await Laptop.findById(req.params.id);
      res.status(200).json(laptop);
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/laptops]
  async getLaptops(req, res, next) {
    try {
      const laptops = await Laptop.find({});
      res.status(200).json(laptops);
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/laptops/search]
  async searchLaptops(req, res, next) {
    const { keywords } = req.query;
    const brandRe = "/dell|lenovo|hp|intel|asus|msi|acer|thinkbook/i"
    const laptopTypeRe = "/học tập văn phòng|laptop gaming|macbook|đồ họa kĩ thuật|mỏng nhẹ|cao cấp sang trọng/i"
    try {
      const brand = keywords.match(brandRe)
      const laptopType = keywords.match(laptopTypeRe)
      const laptopByBrandResult = await Laptop.find({ "brand": { $regex: new RegExp(brand, "i") } });
      const laptopByTypeResult = await Laptop.find({ "laptopType": { $regex: new RegExp(laptopType, "i") } });
      const laptopByNameResult = await Laptop.find({ "laptopName": { $regex: new RegExp(keywords, "i") } });
      const laptops = [...laptopByBrandResult, ...laptopByTypeResult, ...laptopByNameResult]
      res.status(200).json(laptops);
    } catch (err) {
      next(err);
    }
  }





}


module.exports = new LaptopController();