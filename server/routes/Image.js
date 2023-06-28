const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer");
const ImageController = require("../controllers/Image");

router.post("/image/item", upload.single("file"), ImageController.create);
router.post("/image/user", upload.single("file"), ImageController.create);
router.get("/image", ImageController.findAll);
router.delete("/image/:id", ImageController.remove);
router.delete("/imageDeleteAll", ImageController.deleteAll);
router.get("/image/user/:id", ImageController.getImageUser);

module.exports = router;
