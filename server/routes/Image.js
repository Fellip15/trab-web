const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const ImageController = require("../controllers/Image");

router.post("/image", upload.single("file"), ImageController.create);
router.get("/image", ImageController.findAll);
router.delete("/image/:id", ImageController.remove);

module.exports = router;
