import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";


function AddressCard({ addressInfo, hanleAddressEdit, handleDeleteAddress, setCurrentSelectedAddress, selectedId }) {

  console.log(selectedId);
  
  return (
    <Card onClick={()=> addressInfo ? setCurrentSelectedAddress(addressInfo) : null} className={`bg-[#1a1a1a] text-white w-full shadow-md border cursor-pointer ${selectedId && selectedId._id === addressInfo._id ? 'border-white' : 'border-neutral-700'}`}>
      <CardContent className="grid p-3 gap-4 bg-[#1a1a1a] text-white">
        <label>Address: {addressInfo.address}</label>
        <label>City: {addressInfo.city}</label>
        <label>Pincode: {addressInfo.pincode}</label>
        <label>Phone: {addressInfo.phone}</label>
        <label>Notes: {addressInfo.notes}</label>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => hanleAddressEdit(addressInfo)}
          className="bg-yellow-600 text-black hover:bg-yellow-600 cursor-pointer"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="bg-yellow-600 text-black hover:bg-yellow-600 cursor-pointer"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
