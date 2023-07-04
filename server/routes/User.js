const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User')

router.get('/users', UserController.findAll);
router.get('/isAdmin/:token', UserController.isAdmin);
router.get('/getUserByToken/:token', UserController.getUserByToken);

router.post('/users/login', UserController.authUser);
router.post('/users', UserController.create);
router.post('/usersadm', UserController.createAdm);

router.put('/users/:id', UserController.update);
router.put('/usersEnd', UserController.updateEnd);
router.put('/usersPers', UserController.updatePers);
router.put('/usersImage', UserController.updateImage);
router.put('/usersPassword', UserController.updatePassword);

router.delete('/users/:id', UserController.remove);
router.delete('/deleteAllUsers', UserController.clearUsers);

module.exports = router;