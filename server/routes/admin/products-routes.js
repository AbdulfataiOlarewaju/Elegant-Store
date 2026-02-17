const express = require('express');
const {uploadImageController, addProduct, fetchAllProducts, editProduct, deleteProduct} = require('../../controllers/admin/products-controllers')
const imageMiddleware = require('../../middleware/image-middleware')

const router = express.Router(); 



router.post('/upload-image', imageMiddleware,  uploadImageController)
router.post('/add', addProduct)
router.get('/get', fetchAllProducts)
router.put('/edit/:id', editProduct)
router.delete('/delete/:id', deleteProduct)



module.exports = router;