import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails, updateOrderStatusForAdmin } from "@/store/admin/orders-slice";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

const initialFormData = {
  status: "",
};

function AdminOderDetailsView({orderDetails}) {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  console.log(orderDetails, 'orderDetails inside details view');
  


  
  

  function handleUpdateStatus(event){
    event.preventDefault();
    console.log(formData);
    const {status} = formData;
    // Dispatch action to update order status
    dispatch( updateOrderStatusForAdmin({id : orderDetails._id, orderStatus: status}) ).then((data)=>{
      if(data.payload.success){
        // Refresh the order details
        dispatch( getOrderDetailsForAdmin({id : orderDetails._id}) );
        dispatch(getAllOrdersForAdmin());
        toast.success(data?.payload?.message);
        // console.log(data, 'data');
        
      }

      
    })
  }
  return (
    <DialogContent className="sm:max-w-[600px]  w-full lg:h-full h-auto bg-[#0d0c0cfd] text-white">
      <div className="grid gap-3">
        <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Order Date</p>
            <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Status</p>
            <Label><Badge className={`${
                      orderDetails?.orderStatus === "confirmed"
                        ? "bg-green-500" :
                         orderDetails?.orderStatus === "rejected"
                        ? "bg-red-600"
                        : "bg-white"
                    } text-black`}>
                {orderDetails?.orderStatus}
              </Badge></Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
        </div>
        <Separator />
       <div className="grid gap-2">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div> 
               <ul className="grid gap-6">
                {
            orderDetails?.cartItems && orderDetails?.cartItems?.length > 0 ? 
            orderDetails?.cartItems?.map((orderItem)=>(
              <li className="flex items-center justify-between">
                <span className="text-sm">{orderItem.title}</span>
                <span className="text-sm">Qty: {orderItem.quantity}</span>
                <span className="text-sm">Price: ${orderItem.price}</span>
              </li>
            ))
            : null
           }
            </ul>        
          </div>
        </div>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-yellow-600">
              <span>{user?.userName}</span>
              <span>{orderDetails?.addressInfo.address}</span>
              <span>{orderDetails?.addressInfo.city}</span>
              <span>{orderDetails?.addressInfo.pincode}</span>
              <span>{orderDetails?.addressInfo.phone}</span>
            </div>
          </div>
        </div>
        <CommonForm
          formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inprocess", label: "In Process" },
                { id: "inshipping", label: "In shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={'Update Order Status'}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </DialogContent>
  );
}

export default AdminOderDetailsView;
