

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function PaypalCancelPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clean up the session storage when user cancels payment
        sessionStorage.removeItem('currentOrderId');
    }, []);

    return ( 
       <Card className='bg-black rounded-none border-r-0 border-l-0 py-2'>
        <CardHeader>
            <CardTitle className='text-4xl text-white '>Payment Cancelled</CardTitle>
            <CardDescription className="text-white mt-2">
                Your PayPal payment was cancelled. Your order has not been processed.
            </CardDescription>
            <div className="flex gap-4 mt-5">
                <Button onClick={() => navigate('/shop/checkout')} className='bg-yellow-600 hover:bg-yellow-600 cursor-pointer text-black'>
                    Try Again
                </Button>
                <Button onClick={() => navigate('/shop/cart')} variant="outline" className='border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black cursor-pointer'>
                    View Cart
                </Button>
            </div>
        </CardHeader>
       </Card>
     );
}

export default PaypalCancelPage;
