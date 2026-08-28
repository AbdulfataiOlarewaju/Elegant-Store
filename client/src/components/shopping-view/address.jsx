import { addressFormControls } from "@/config";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdress, deleteAdress, fetchAdress, updateAdress } from "@/store/shop/address-slice";
import { toast } from "sonner";
import AddressCard from "./address-card";

const initialFormData = {
  address: "",
  city: "",
  notes: "",
  phone: "",
  pincode: "",
};

function Address({setCurrentSelectedAddress, selectedId}) {
  const [formData, setFormData] = useState(initialFormData);
  const dispactch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [CurrentEditedId, setCurrentEditedId] = useState(null);
  function handleManageAddress(event) {
    event.preventDefault();
    if(addressList.length >=3 && CurrentEditedId == null ){
      toast.error("You can only add up to 3 addresses");
      setFormData(initialFormData);
      return;
    }
    CurrentEditedId ? 
    dispactch(updateAdress({
      formData : formData,
      userId: user.id,
      addressId: CurrentEditedId
    })).then((data)=>{
      if(data?.payload?.success){
        setCurrentEditedId(null);
        toast.success("Address Edited successfully");
        setFormData(initialFormData);
        dispactch(fetchAdress(user.id));
      }
      console.log(data);

    }) :
    dispactch(addAdress({ formData: { ...formData, userId: user.id } }))
      .then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          setFormData(initialFormData);
          dispactch(fetchAdress(user.id));
          toast.success("Address added successfully");
        }
      })
      
  }
  function hanleAddressEdit(getAddressInfo){
    setCurrentEditedId(getAddressInfo._id);
    setFormData({
      ...formData,
      address: getAddressInfo.address,
      city: getAddressInfo.city,
      notes: getAddressInfo.notes,
      phone: getAddressInfo.phone,
      pincode: getAddressInfo.pincode,
    });
    dispactch()
  }
  function handleDeleteAddress(getCurrentAddress){
    // console.log(getCurrentAddress);
    dispactch(deleteAdress({userId : user.id, addressId : getCurrentAddress._id})).then((data)=>{
      dispactch(fetchAdress(user.id));
    })
  }
  useEffect(() => {
    dispactch(fetchAdress(user.id));
  }, [dispactch]);

  console.log(addressList, "addressList");

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  return (
    <Card className="bg-[#0d0c0cfd] text-white">
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-4">
        {addAdress && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                addressInfo={singleAddressItem}
                hanleAddressEdit={hanleAddressEdit}
                handleDeleteAddress={handleDeleteAddress}
                key={singleAddressItem?.id}
                selectedId={selectedId}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>{
          CurrentEditedId ? "Edit Address" : "Add New Address"
          }</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={CurrentEditedId ? "Edit Address" : "Add Address"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
