const express = require('express');
const router =  express.Router();
const path = require('path');



const accountController = require('../controllers/account');

router.get('/login', accountController.getLogin);
router.post('/account/login', accountController.postLogin);

router.get('/register', accountController.getRegister);
router.post('/account/register', accountController.postRegister);

router.get('/forgot-password', accountController.getFPassword);
router.post('/forgot-password', accountController.postFPassword);

router.get('/logout', accountController.getLogout);


module.exports = router;