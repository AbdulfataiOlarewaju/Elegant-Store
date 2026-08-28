import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/orders-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";



function PayPalReturnPage() {

    const dispactch = useDispatch();
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId');
    const payerId = params.get('PayerID');
    
    


    useEffect(()=>{
        if(paymentId && payerId){
            const storedOrder = sessionStorage.getItem('currentOrderId');
            console.log(storedOrder);

            const orderId = storedOrder ? JSON.parse(storedOrder) : null;
            if(orderId){
                dispactch( capturePayment({paymentId, payerId, orderId}) ).then((data)=>{
                    if(data?.payload?.success){
                        sessionStorage.removeItem('currentOrderId');
                        window.location.href = '/shop/payment-success';
                    }
                })
            } else {
                console.error('Order ID not found in sessionStorage. Payment capture aborted.');
            }
        }
    }, [paymentId, payerId, dispactch]);

    return ( 
       <Card className='bg-black rounded-none border-r-0 border-l-0'>
        <CardHeader>
            <CardTitle className='text-4xl text-white'>Processing Payment...Please wait</CardTitle>
        </CardHeader>
        
       </Card>
     );
}

export default PayPalReturnPage;