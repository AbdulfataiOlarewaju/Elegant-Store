const Product  = require('../../models/Product')


const searchProducts = async(req, res)=>{
    try {
        const {keyword} = req.params;
        if(!keyword || typeof keyword !== 'string'){
            return res.status(400).json({
                success : false,
                message : "Invalid keyword",
            })
        }
        const regEx = new RegExp(keyword, 'i'); // 'i' for case-insensitive

        const createSearchQuery = {
            $or: [
                { title : regEx },
                { description : regEx },
                { category : regEx },
                { brand : regEx }
            ],
        };
        const searchResult = await Product.find(createSearchQuery);
        res.status(200).json({
            success : true,
            data: searchResult,
        })
        
    } catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "something went wrong",
        })
        
    }
}



module.exports = {
    searchProducts,
}