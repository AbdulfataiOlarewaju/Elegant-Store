
const express = require('express')
const {getFilteredProducts, getProductdetails} = require('../../controllers/shop/products-controllers')

const router = express.Router();



router.get('/get', getFilteredProducts)
router.get('/get/:id', getProductdetails)


 



module.exports = router;                       