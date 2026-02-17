
const Order = require("../../models/Order");




const getAllOrdersOfAllUsers = async (req, res)=>{
  try {
    
    const orders = await Order.find({})
    if(!orders){
      res.status(404).json({
        success: false,
        message : "order not found"
      })
    }
    res.status(200).json({ 
      success: true,
      data: orders
    })
  } catch (error) { 
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    }); 
  }
}

const getOrderDetailsForAdmin = async (req, res)=>{
  try {
    const {id} = req.params;
    const order = await Order.findById(id)
    if(!order){
      res.status(404).json({
        success: false,
        message : "order not found"
      })
    }
    res.status(200).json({
      success: true,
      data: order
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
}
const updateOrderStatusForAdmin = async (req, res)=>{
  try {
    const {id} = req.params;
    const {orderStatus} = req.body;
    const order = await Order.findByIdAndUpdate(id, {orderStatus}, {new: true});
    if(!order){
      res.status(404).json({
        success: false,
        message : "order not found"
      })
    }
    return res.status(200).json({
      success : true,
      message : 'order status updated successfully',
      data : order
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
}

module.exports = { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatusForAdmin };