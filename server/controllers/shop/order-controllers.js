const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require('../../models/Cart')
const Product = require('../../models/Product')

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.ClIENT_BASE_URL}/shop/paypal-return`,
        cancel_url: `${process.env.ClIENT_BASE_URL}/shop/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "Order description",
        },
      ],
    };
    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        
        res.status(500).json({
          success: false,
          message: "error while creating paypal payment",
        });
      } else {
        const newLycreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });
        await newLycreatedOrder.save()

        const approvalURL = paymentInfo.links.find(link =>link.rel === 'approval_url').href;
        res.status(201).json({
            success : true,
            approvalURL,
            orderId : newLycreatedOrder._id
        })
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const {paymentId, payerId, orderId} = req.body;
    let order = await Order.findById(orderId);
    if(!order){
        return res.status(404).json({
            success : false,
            message : 'order not found'
        })
    }
    order.paymentStatus = 'paid';
    order.paymentId = paymentId;
    order.payerId = payerId;
    order.orderStatus = 'confirmed';

    console.log('Order cartItems:', order.cartItems);
    for(let item of order.cartItems){
      let product = await Product.findById(item.productId);
      if(!product){
        return res.status(404).json({
          success : false,
          message : `Product not found for ID ${item.productId}`
        })
      }
      if(product.totalStock < item.quantity){
        return res.status(400).json({
          success : false,
          message : `Insufficient stock for product ${product.title}`
        })
      }
      product.totalStock -= item.quantity;
      await product.save();
    }


    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);
    await order.save();

     res.status(200).json({
        success : true,
        message : 'payment captured successfully',
        data:order
    })
       
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    }); 
  }
};
const getAllOrders = async (req, res)=>{
  try {
    const {userId} = req.params;
    const orders = await Order.find({userId})
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

const getOrderDetails = async (req, res)=>{
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
module.exports = { createOrder, capturePayment, getAllOrders, getOrderDetails };
