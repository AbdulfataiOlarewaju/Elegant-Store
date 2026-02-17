import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

function ShoppingOrderDetailsView({orderDetails}) {
  const {user} = useSelector((state) => state.auth);
    return ( 
         <DialogContent className="sm:max-w-[600px]  w-full h-full sm:h-auto bg-[#0d0c0cfd] text-white">
      <div className="grid gap-3">
        <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Order Date</p>
            <Label>{orderDetails?.orderDate?.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Status</p>
            <Label>
              <Badge className={`${
                      orderDetails?.orderStatus === "confirmed"
                        ? "bg-green-500" :
                         orderDetails?.orderStatus === "rejected"
                        ? "bg-red-600"
                        : "bg-white"
                    } text-black`}>
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
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
               <ul className="grid gap-2">
                {
            orderDetails?.cartItems && orderDetails?.cartItems?.length > 0 ? 
            orderDetails?.cartItems?.map((orderItem)=>(
              <li className="flex items-center justify-between">
                <span className="lg:text-sm text-[12px]">{orderItem.title}</span>
                <span className="lg:text-sm text-[12px]">Qty: {orderItem.quantity}</span>
                <span className="lg:text-sm text-[12px]">Price: ${orderItem.price}</span>
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
             <div className="font-medium">PaymentMethod</div>
            <div className="grid gap-0.5 text-yellow-600">              
              <span>{orderDetails?.paymentMethod}</span>
            </div>
             <div className="font-medium">PaymentStatus</div>
            <div className="grid gap-0.5 text-yellow-600">
              <span>{orderDetails?.paymentStatus}</span>              
            </div>
          </div>
        </div>
    
      </div>
    </DialogContent>
     );
}

export default ShoppingOrderDetailsView;