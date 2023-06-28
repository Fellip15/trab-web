const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User')

router.post('/users/login', UserController.authUser);
router.post('/users', UserController.create);
router.post('/users/token', UserController.authToken);
router.delete('/users/:id', UserController.remove);
router.delete('/deleteAllUsers', UserController.clearUsers);
router.put('/users/:id', UserController.update);
router.put('/usersEnd/:id', UserController.updateEnd);
router.put('/usersPers/:id', UserController.updatePers);
router.put('/usersImage', UserController.updateImage);
router.get('/users', UserController.findAll);
router.get('/users-email/:email', UserController.findByEmail);
router.get('/users-usrname/:userName', UserController.findByUserName);

module.exports = router;