const Address = require("../../models/Address");

const addAdress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone) {
      return res
        .status(400)
        .json({success: false, message: "All fields are required except notes" });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();

    res
      .status(201)
      .json({success: true, message: "Address added successfully", address: newAddress, data: newAddress });
  } catch (error) {
    res.status(500).json({ success:false, message: "Internal Server Error" });
  }
};

const fetchAdress = async (req, res) => {
    
    
  try {
    const { userId } = req.params;
    if(!userId){
        return res.status(400).json({ success:false, message:"User id is required"});
    }

    const addressList = await Address.find({userId});
        res.status(200).json({
            success: true,
            message: "Address fetched successfully",
            data: addressList
        })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editAdress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if(!userId || !addressId){
        return res.status(400).json({ success:false, message:"User id and Address id are required"});
    }
    const address = await Address.findOneAndUpdate({_id:addressId, userId},
        formData, {new:true}
    )
    if(!addAdress){
        return res.status(404).json({
            success:false,
            message : 'address not found'
        })
    }
    res.status(200).json({
        success : true,
        message : 'Address updated successfully'
    })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAdress = async (req, res) => {
  try {
     const { userId, addressId } = req.params;
    
    if(!userId || !addressId){
        return res.status(400).json({ success:false, message:"User id and Address id are required"});
    }
    const address = await Address.findOneAndDelete({_id:addressId, userId})
    if(!address){
          return res.status(404).json({
            success:false,
            message : 'address not found'
        })
    }
       res.status(200).json({
        success : true,
        message : 'Address deleted successfully'
    })
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
    addAdress,
    fetchAdress,
    editAdress,
    deleteAdress
}