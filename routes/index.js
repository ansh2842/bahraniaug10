var express = require('express');
var router = express.Router();
var adminControlelr = require('../Controller/adminController')
var carouselController = require('../Controller/carouselController')
var productController = require('../Controller/productController')
var categoryController = require('../Controller/categoryController')
var navSliderController = require('../Controller/navsliderController')
var aboutController = require('../Controller/aboutController')
var razorpayController = require('../Controller/razorpayController')
var codController = require('../Controller/codController')
const requireAuth = require('../middleware/middleware');
var multer = require('multer');
const { validate } = require('../Model/adminModel');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +'-'+ file.originalname)
    },
})

var upload = multer({
    storage: storage
})



router.post("/admin",adminControlelr.data)
router.post("/dataLogin",adminControlelr.dataLogin)
router.get("/adminget",requireAuth,adminControlelr.dataGet)
router.get("/admineditGet/:id",requireAuth,adminControlelr.dataGetEdit)
router.put("/admineditdata/:id",adminControlelr.dataEdit)

//carousel

router.post("/addcarousel",upload.single("image"),carouselController.addCrousel)
router.get("/getcarousel",requireAuth,carouselController.getCrousel)
router.get("/editcaruosel/:id",requireAuth,carouselController.editCrousel)
router.put("/carouselEdit/:id",upload.single("image"),carouselController.editCrouselend)
router.delete("/carouselDelete/:id",carouselController.deleteCrousel)

//product
router.post("/productadd",upload.array("image"),productController.addProduct)
router.get("/getproduct",requireAuth,productController.getproduct)
router.get("/editgetProdcut/:id",productController.geteditproduct)
router.delete("/productDelete/:id",productController.deleteproduct)
router.put("/editProduct/:id",upload.array("image"),productController.editproduct)
router.put("/editstatus/:id",productController.editstatus)
router.put("/editstatuss/:id",productController.editstatuss)

//category
router.post("/addCategory",categoryController.addCategory)
router.get("/getCategory",requireAuth,categoryController.getCategory)
router.get("/editCategory/:id",categoryController.editCategory)
router.put("/updateCategory/:id",categoryController.updateCategory)
router.delete("/categoryDelete/:id",categoryController.categoryDelete)

//navSLider
router.post("/addSlider",navSliderController.addSlider)
router.get("/getSlider",requireAuth,navSliderController.getSlider)
router.get("/getSlideredit/:id",navSliderController.getSlideredit)
router.put("/editSlider/:id",navSliderController.editSlider)
router.delete("/navSliderDelete/:id",navSliderController.navSliderDelete)

//about
router.post("/addAbout",upload.array("image"), aboutController.addAbout)
router.get("/getabout", requireAuth,aboutController.getabout)
router.get("/geteditabout/:id",aboutController.geteditabout)
router.put("/editabout/:id",upload.array("image"),aboutController.editabout)
router.delete("/aboutDelete/:id",aboutController.aboutDelete)


//razorpay
router.post('/pay',razorpayController.order)
router.post('/validate',razorpayController.validate)
router.post('/codpost',razorpayController.validate)

//cod
router.post('/codposts',codController.orders)
router.get('/getOrders',codController.getorders)
router.get('/getOrdersbyid/:id',codController.getordersbyIds)
router.get('/getOrdersbyids/:id',codController.getordersbyIdss)

//trackingprdt

router.post('/productTrack',codController.track)

module.exports = router;