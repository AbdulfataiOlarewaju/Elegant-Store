const { upLoadToCloudinary } = require("../../helpers/cloudinary-helpers");
const Product = require("../../models/Product")
const fs = require('fs')

const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "image file is missing! please upload an image",
      });
    }
    const { url, publicId } = await upLoadToCloudinary(req.file.path);   
    res.status(200).json({
      success: true,
      message: "image uploaded successfully",
      data: {
        url,
        publicId,
      },
    });
    // delete the file from local  storage
    fs.unlinkSync(req.file.path) 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occurred while uploading image",
    });
  }
};
// add new product
const addProduct = async (req, res) => {
  try {
    const {
        image,
        description,
        category,
        brand,
        price,
        title,
        salePrice,
        totalStock
    } = req.body;
   

    const newlyCreatedProduct = new Product({
        image,
        description,
        category,
        brand,
        price,
        title,
        salePrice,
        totalStock
    });
    await newlyCreatedProduct.save()
    return res.status(201).json({
        success : true,
        message : 'product added successfully',
        data : newlyCreatedProduct
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occurred",
    });
  }
};

// fetch all procducts

const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({})
        res.status(200).json({
            success: true,
            data: listOfProducts
        })

    } catch (error) {
        res.status(500).json({
      success: false,
      message: "error occurred",
    });
    }
}



const editProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {
        image,
        description,
        category,
        brand,
        price,
        title,
        salePrice,
        totalStock
    } = req.body;

    let findProductbyId = await Product.findById(id)
    if(!findProductbyId){
      return res.status(404).json({
        success : false,
        message : 'Product not fund'
      })
    }
    findProductbyId.image = image || findProductbyId.image;
    findProductbyId.description = description || findProductbyId.description; 
    findProductbyId.category = category || findProductbyId.category;
    findProductbyId.brand = brand || findProductbyId.brand;
    findProductbyId.price = price === '' ? 0 : price || findProductbyId.price;
    findProductbyId.title = title || findProductbyId.title;
    findProductbyId.salePrice = salePrice === '' ? 0 : salePrice ||  findProductbyId.salePrice;
    findProductbyId.totalStock = totalStock || findProductbyId.title
     await findProductbyId.save()
     res.status(200).json({
      success:true,
      message : 'product edited successfully',
      data : findProductbyId
     })
    } catch (error) {
        res.status(500).json({
      success: false,
      message: "error occurred",
    });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)

        if(!product) {
          return res.status(404).json({
            success : false,
            message : 'product not found'
          })
        }
        res.status(200).json({
          success : true,
          message : 'product deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
      success: false,
      message: "error occurred", 
    });
    }
};
 

module.exports = {
  uploadImageController,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct
  
};
