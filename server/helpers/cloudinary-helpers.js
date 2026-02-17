const cloudinary = require("../config/cloudinary")



const upLoadToCloudinary = async(filePath)=> {
    try {
        const result = await cloudinary.uploader.upload(filePath)

        return {
            url : result.secure_url,
            publicId : result.public_id
        }
    } catch (error) {
        console.log('error while uploading to cloudinary! please try again');
        throw new Error("cloudinary upload failed");
        
        
        
    }
}


module.exports = {
    upLoadToCloudinary
}