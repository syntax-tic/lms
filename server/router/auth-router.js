const express = require('express');
const router = express.Router();

const authcontroller = require('../controllers/auth-controller')


router.route('/').get(authcontroller.Home);
router.route('/register').post(authcontroller.Register);
router.route('/login').post(authcontroller.Login);


module.exports= router;