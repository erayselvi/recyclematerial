const express = require('express');
const router =  express.Router();
const path = require('path');
const isAuthorization=require("../middleware/authorization")

const adminController = require('../controllers/admin')

router.get('/add-material',isAuthorization, adminController.getAddMaterial);
router.post('/add-material',isAuthorization, adminController.postAddMaterial);

router.get('/edit-material',isAuthorization, adminController.getEditMaterial);
router.post('/edit-material',isAuthorization, adminController.postEditMaterial);

module.exports = router;