const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.url === "/image/item")
      cb(null, "public/itemImages");
    else if (req.url === "/image/user")
      cb(null, "public/userImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
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