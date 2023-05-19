const User = require("../models/User");
const bcrypt = require('bcrypt');
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
const uploadSeaweed = require("../middlewares/fileExtension");



class UserController {
  // POST [/api/admin/users]
  async createUser(req, res, next) {
    const salt = bcrypt.genSaltSync(12);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const fileName = new Date().valueOf().toString();
    const url = "http://10.9.3.50:8888";
    const folder = "LaptopAI";
    const response = await uploadSeaweed(req.file, url, folder, fileName);
    if(response) {
      req.body.photo = response;
      const newUser = new User(req.body);
      try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
      } catch (err) {
        next(err);
      }
    }
    else res.status(404).json({sucess: false, msg: "Thêm user không thành công"});
    
  }
  // PUT [/api/admin/users/:id]
  async updateUser(req, res, next) {
    const salt = bcrypt.genSaltSync(12);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const fileName = new Date().valueOf().toString();
    const url = "http://10.9.3.50:8888";
    const folder = "LaptopAI";
    const response = await uploadSeaweed(req.file, url, folder, fileName);
    if(response) {
      req.body.photo = response;
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
      }
    }
    
  }
  // DELETE [/api/admin/users/:id]
  async deleteUser(req, res, next) {
    try {
      await User.delete({ _id: req.params.id });
      res.status(200).json("User is moved to trash");
    } catch (err) {
      next(err);
    }
  }

  // DELETE [/api/admin/users/:id/force]
  async destroyUser(req, res, next) {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/users/:id]
  async getUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/users]
  async getUsers(req, res, next) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/users/count]
  async countUsers(req, res, next) {
    try {
      const userCount = await User.countDocuments({});
      res.json({ type: "users", count: userCount });
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/users/search]
  async searchUsers(req, res, next) {
    const { keywords } = req.query;
    try {
      const users = await User.find({ "email": { $regex: keywords }});
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }



}


module.exports = new UserController();