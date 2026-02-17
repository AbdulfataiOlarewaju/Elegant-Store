const Product = require('../../models/Product')


const getFilteredProducts = async(req, res)=>{

    const {category = [], brand = [], sortBy = "price-lowtohigh"} = req.query
    let filters = {};

    if(category.length){
        filters.category = {$in:category.split(',')};
    }
    if(brand.length){
        filters.brand = {$in:brand.split(',')};
    }

    let sort = {}

    switch (sortBy) {
        case 'price-lowtohigh':
            sort.price = 1
            
            break;
         
         case 'price-hightolow':
            sort.price = -1
            
            break;
        case 'title-atoz':
            sort.price = 1
            
            break;
         case 'title-ztoa':
            sort.price = -1
            
            break;
    
        default:
            sort.price = 1
            break;
    }
    try {
        const products = await Product.find(filters).sort(sort);   
        res.status(200).json({
            success : true,
            data : products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'something went wrong! please try again later'    
        })
        
    }
}

const getProductdetails = async(req, res)=>{
    try {
        const id = req.params.id;
        
        const product = await Product.findById(id) 
        if(!product){
            return res.status(404).json({
                success : false,
                message : `Product with ${id} not found`
            })
        }
        return res.status(200).json({
            success : true,
            data : product
        }
        )

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,  
            message : 'something went wrong! please try again later'     
        })
    }
}


module.exports = {
    getFilteredProducts,
    getProductdetails
};