const express = require('express');
const router =  express.Router();
const path = require('path');
const isAuthenticated = require('../middleware/authentication')

const usersController=require('../controllers/user');
router.get('/', isAuthenticated ,usersController.getMaterials);

router.post('/addcarbon', isAuthenticated ,usersController.postAddCarbon);
router.get('/materials',usersController.getListMaterials)

router.get('/wallet', isAuthenticated ,usersController.getWallet);
router.post('/user/wallet', isAuthenticated ,usersController.postWallet);

router.get('/new-wallet', isAuthenticated ,usersController.getNewWallet);
router.post('/user/new-wallet', isAuthenticated ,usersController.postNewWallet);

router.post('/user/carbontocoin', isAuthenticated ,usersController.postCarbontoCoin);
module.exports= router;