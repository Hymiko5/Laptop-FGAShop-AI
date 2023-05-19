const uploadSeaweed = require("../middlewares/fileExtension");

class FileController {
  // POST [/api/admin/file/upload]
  async upload(req, res, next) {
    try {
    const fileName = new Date().valueOf().toString();
    const url = "http://10.9.3.50:8888";
    const folder = "LaptopAI";
    const response = await uploadSeaweed(req.file, url, folder, fileName);
    res.status(200).json(response);
    } catch (err) {
    next(err);
    }
  }


}


module.exports = new FileController();