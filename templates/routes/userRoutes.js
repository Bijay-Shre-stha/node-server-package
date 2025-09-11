// This is the user route file. It contains the routes for the user model. It is responsible for defining the routes that the user can access and calling the appropriate controller functions when a user makes a request to the server.

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.get('/',  userController.getAllUsers);
router.post('/',  userController.createUser);

module.exports = router;