

const express = require("express")


const {getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatusForAdmin} = require('../../controllers/admin/order-controller')


const router = express.Router();



router.get('/get', getAllOrdersOfAllUsers)
router.get('/details/:id', getOrderDetailsForAdmin)
router.put('/update/:id', updateOrderStatusForAdmin)


module.exports = router;