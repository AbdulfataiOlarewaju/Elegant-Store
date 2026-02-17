

const express = require("express")


const {capturePayment, createOrder, getAllOrders, getOrderDetails} = require('../../controllers/shop/order-controllers')


const router = express.Router();

router.post('/create', createOrder)
router.post('/capture', capturePayment)
router.get('/get/:userId', getAllOrders)
router.get('/details/:id', getOrderDetails)


module.exports = router;