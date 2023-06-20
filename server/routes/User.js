const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User')

router.get('/api/teste', UserController.teste);

module.exports = router;