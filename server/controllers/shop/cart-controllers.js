const Cart = require('../../models/Cart')
const Product = require('../../models/Product')

const addToCart = async(req, res)=>{
  try {
    const {userId, productId, quantity} = req.body;

    if(!userId || !productId || quantity <=0){
      return res.status(400).json({
        success:false,
        message:'invalid data provided'
      })
    }

    // find the product base on the productId

    const product = await Product.findById(productId);
    if(!product){
      return res.status(404).json({
        success:false,
        message:'Product not found',
      })
    }

    // check if user already has this item in cart
    let cart = await Cart.findOne({userId})
    if(!cart){
      // create a new cart for that user
      cart = new Cart({userId, items:[{productId,quantity}]})
      // first time adding to cart productId will be -1
    }
    const findCurrentProductIndex = cart.items.findIndex((item)=>item.productId.toString() === productId)
    if(findCurrentProductIndex === -1){
      cart.items.push({productId, quantity})
    } else{
      //if the product is already there, we need to increase its qty by one 
      cart.items[findCurrentProductIndex].quantity += quantity
    }

    await cart.save();
    return res.status(200).json({
      success:true,
      message:'Item added to cart successfully',
      data:cart
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:"Something went wrong",
    })
    
  }
}





const fetchCartItems = async(req, res)=>{
  try {
    const {userId} = req.params;
    if(!userId){
      return res.status(404).json({
        success:false,
        message:'UserId is required'
      })
      }
        const cart = await Cart.findOne({userId}).populate({
        path:'items.productId',
        select:['title', 'price','image', 'salePrice']
      })
      if(!cart){
        return res.status(404).json({
          success:false,
          message:'No cart found with this userId'
        })
      }

      const validItems = cart.items.filter(
      (productItem) => productItem.productId //when you add a product to ur cart and the admin has already deleted the cart.itmes the product also will be deleted from the cart. So when u try to get all the products in your cart it will give an error because of the invalid id, so we need to validate the product with ids and see if the product is present
    );
    if (validItems.length < cart.items.length) { //that mean some item might have been deleted (cart.items.length)
      cart.items = validItems;
      await cart.save();
    }
    const populatedCartItems =  validItems.map((item)=> ({
      productId:item.productId._id,
      image:item.productId.image,
      title:item.productId.title,
      salePrice:item.productId.salePrice,
      price:item.productId.price,
      quantity:item.quantity
    }))
    res.status(200).json({
      success:true,
      message:'Cart fetched successfully',
      data:{
        ...cart._doc,
        items:populatedCartItems
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:"Something went wrong",
    })
    
  }
}






const updateCartItemQty = async(req, res)=>{
  try {
     const {userId, productId, quantity} = req.body;

    if(!userId || !productId || quantity <=0){
      return res.status(400).json({
        success:false,
        message:'invalid data provided'
      })
    }
    const cart = await Cart.findOne({userId});
    if(!cart){
        return res.status(404).json({
          success:false,
          message:'No cart found with this userId'
        })
      }
      const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toString() === productId);
      if(!findCurrentProductIndex === -1){
        return res.status(404).json({
          success : false,
          message : 'Cart item not present'
        })      
      }
      cart.items[findCurrentProductIndex].quantity = quantity
      await cart.save()

      await cart.populate({
        path:'items.productId',
        select:['title', 'price','image', 'salePrice']
      })
      
         const populatedCartItems = cart.items.map((item)=> ({
      productId: item.productId ? item.productId._id: null,
      image:item.productId ? item.productId.image :null,
      title:item.productId ? item.productId.title : 'product not found',
      salePrice: item.productId? item.productId.salePrice : null,
      price: item.productId ? item.productId.price :null,
      quantity:item.quantity
    }));

       res.status(200).json({
      success:true,
      message:'Cart fetched successfully', 
      data:{
        ...cart._doc,
        items:populatedCartItems
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:"Something went wrong",
    })
    
  }
}





const deleteCartItem = async(req, res)=>{
  try {
    const {userId, productId} = req.params
    
    if(!userId || !productId){
      return res.status(400).json({
        success:false,
        message:'invalid data provided'
      })
    }
    const cart = await Cart.findOne({userId}).populate({
      path:'items.productId',
        select:['title', 'price','image', 'salePrice']
    })
    if(!cart){
        return res.status(404).json({
          success:false,
          message:'cart not found with this userId'
        })
      }
      
        cart.items = cart.items.filter(item=>item.productId._id.toString() !== productId)
        await cart.save();
        
        cart.populate({
      path:'items.productId',
        select:['title', 'price','image', 'salePrice']
    })
           const populatedCartItems = cart.items.map((item)=> ({
      productId: item.productId ? item.productId._id: null,
      image:item.productId ? item.productId.image :null,
      title:item.productId ? item.productId.title : 'product not found',
      salePrice: item.productId ? item.productId.salePrice : null,
      price: item.productId ? item.productId.price :null,
      quantity:item.quantity
    }));

       res.status(200).json({
      success:true,
      message:'Cart fetched successfully',
      data:{
        ...cart._doc,
        items:populatedCartItems
      }
    })
  } catch (error) {
    console.log(error); 
    res.status(500).json({
      success: false,
      message:"Something went wrong",
    })
    
  }
}


module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem
}