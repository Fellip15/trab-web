const express = require('express');
const router = express.Router();
const { upload } = require("../config/multer");
const ItemController = require('../controllers/Item')

router.post('/item', ItemController.create);
router.post('/item/buy', ItemController.buyItens);
router.get('/cardItem', ItemController.findAllToCard);
router.delete('/item/:id', ItemController.remove);
router.delete('/deleteAllItems', ItemController.clearItems);
router.delete('/deleteImageItem', ItemController.deleteImage);
router.put('/item/:id', ItemController.update);
router.put('/itemImage', ItemController.updateImage);
router.get('/item', ItemController.findAll);
router.get('/item/:id', ItemController.getItemById);

module.exports = router;