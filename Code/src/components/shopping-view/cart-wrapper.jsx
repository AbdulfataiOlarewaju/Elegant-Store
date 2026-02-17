import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";


function UserCartWrraper({cartItems, setOpenCartSheet}) {
    const navigate = useNavigate()
    const totalAmount = cartItems && cartItems.length > 0 ?
    cartItems.reduce((sum, currentItem)=> sum + (
        currentItem?.salePrice > 0 ? currentItem?.salePrice  : currentItem?.price
    ) * currentItem.quantity, 0)
    : 0
    return ( 
        <SheetContent className='sm:max-w-md bg-black text-white p-4 rounded-lg'>
            <SheetHeader>
                <SheetTitle className='text-white font-bold'>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {
                    cartItems && cartItems.length > 0 ? 
                    cartItems.map((item)=> <UserCartItemsContent cartItems={item} key={item.id}/>)
                    : null
                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">{totalAmount}</span>
                </div>
            </div>
            <Button onClick={()=>{
                navigate('/shop/checkout')
                setOpenCartSheet(false);
            }} className="w-full mt-6 bg-yellow-600 hover:bg-yellow-600 cursor-pointer font-semi-bold">Checkout</Button>
        </SheetContent>
     );
}

export default UserCartWrraper;