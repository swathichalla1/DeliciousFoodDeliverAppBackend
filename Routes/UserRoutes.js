const userController = require("../Controllers/UserController")

const express = require("express")

const router = express.Router();

router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.get('/getUserdetails/:id',userController.getUserdetails)
router.put('/updateNumber',userController.updateNumber)
router.put('/updateAddress',userController.updateAddress)
router.put('/updateCartList',userController.updateCartList)
router.get('/getCartList/:id',userController.getCartList)

module.exports = router;