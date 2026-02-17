import Address from "@/components/shopping-view/address";
import checkOutImg from "../../assets/bg1.avif";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/orders-slice";
import { href } from "react-router-dom";
import { toast } from "sonner";
function ShoppingCheckOut() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  const {approvalURL} = useSelector(state => state.shopOrder)
  
  const dispatcch  =  useDispatch()
  // console.log(currentSelectedAddress);
  
    
    const totalAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem.quantity,
          0
        )
      : 0;

  function handleInitiatePayPalPament() {
     if(cartItems.length === 0){
      toast.message("Your cart is empty. Please add items to your cart before proceeding to checkout.");
      return;
    }
    if(!currentSelectedAddress){
      toast.message("Please select an address to proceed with the payment");
      return;
    }
    const cartId = cartItems && cartItems._id ? cartItems._id : null;
    const orderData = {
      userId : user.id,
      cartId:cartId,
      cartItems : cartItems.items.map(singleCartItem=> ({
      productId: singleCartItem?.productId,
      title: singleCartItem?.title,
      image: singleCartItem?.image,
      price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
      quantity: singleCartItem?.quantity,
      })),
      addressInfo : {
        addressId: currentSelectedAddress?.id,
    address: currentSelectedAddress?.address,
    city: currentSelectedAddress?.city,
    pincode: currentSelectedAddress?.pincode,
    phone: currentSelectedAddress?.phone,
    note: currentSelectedAddress?.note,
      },
      orderStatus : 'pending',
      paymentMethod : 'paypal',
      paymentStatus : 'pending',
      totalAmount : totalAmount,
      orderDate : new Date(),
      orderUpdateDate : new Date(),
      paymentId:'',
      payerId : '',
    };
    console.log(orderData, 'abdulfatai');

    dispatcch(createNewOrder({orderData})).then((data)=>{
      if(data?.payload?.success){
        setIsPaymentStart(true)
      } else {
        setIsPaymentStart(false)
      }
      
    })
  }
  if(approvalURL){
    window.location.href = approvalURL
  }
    



  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={checkOutImg}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-6">
        <Address currentSelectedAddress={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} selectedId={currentSelectedAddress}/>
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((singleCartItem) => (
                <UserCartItemsContent cartItems={singleCartItem} />
              ))
            : null}
          <div className="mt-8 space-y-4 text-white">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">{totalAmount}</span>
            </div>
          </div>
          <Button
            onClick={handleInitiatePayPalPament}
            className="bg-yellow-600 hover:bg-yellow-600 cursor-pointer text-black font-semibold"
          >
            {
              isPaymentStart ? 'Procesing Paypal Payment...' : 'Checkout with PayPal'
            }
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckOut;
