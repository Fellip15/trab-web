const multer = require("multer");
const { uuid } = require('uuidv4');

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.url === "/image/item")
      cb(null, "public/itemImages");
    else if (req.url === "/image/user")
      cb(null, "public/userImages");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + uuid() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);

    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Apenas imagens são autorizadas!'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  }
});

module.exports.upload = upload;