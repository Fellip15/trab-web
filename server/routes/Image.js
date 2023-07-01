const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer");
const ImageController = require("../controllers/Image");

router.post("/image/item", upload.array("file"), ImageController.createImagesItem);
router.post("/image/user", upload.single("file"), ImageController.createImageUser);
router.get("/image", ImageController.findAll);
router.delete("/image/:id", ImageController.remove);
router.delete("/imageDeleteAll", ImageController.deleteAll);
router.get("/image/:id", ImageController.getImage);

module.exports = router;
