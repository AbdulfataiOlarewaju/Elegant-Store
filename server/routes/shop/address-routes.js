const express = require("express");
const {
    addAdress,
    fetchAdress,
    editAdress,
    deleteAdress
} = require('../../controllers/shop/address-controller')

const router = express.Router();



router.post('/add', addAdress);
router.get('/get/:userId', fetchAdress);
router.put('/edit/:userId/:addressId', editAdress);
router.delete('/delete/:userId/:addressId', deleteAdress);


module.exports = router;