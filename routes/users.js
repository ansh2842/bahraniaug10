var express = require('express');
var router = express.Router();
var navSliderController = require('../Controller/navsliderController')
var productController = require('../Controller/productController')
var categoryController = require('../Controller/categoryController')

router.get('/getSliderfront',navSliderController.getSliderfront)
router.get('/getProductDetails',productController.getProductDetails)
router.get('/getCategoryDetails',categoryController.getCategoryDetails)




module.exports = router;
