const Laptop = require('../models/Laptop')
const LaptopType = require('../models/laptopType');

class LaptopController {
  // POST [/api/admin/laptops]
  async createLaptop(req, res, next) {
    const newLaptop = new Laptop(req.body);
    try {
      const savedLaptop = await newLaptop.save();
      res.status(200).json(savedLaptop);
    } catch (err) {
      next(err);
    }
  }
  // PUT [/api/admin/laptops/:id]
  async updateLaptop(req, res, next) {
    try {
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
}


module.exports = new LaptopController();