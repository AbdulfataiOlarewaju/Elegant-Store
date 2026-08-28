import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";


function PaymentSuccessPage() {
    const navigate = useNavigate()
    return ( 
       <Card className='bg-black rounded-none border-r-0 border-l-0 py-2'>
        <CardHeader>
            <CardTitle className='text-4xl text-white '>Payment Successful</CardTitle>
            <Button  onClick={()=>navigate('/shop/account')} className='mt-5 w-sm bg-yellow-600 hover:bg-yellow-600 cursor-pointer text-black'>View Orders</Button>
        </CardHeader>
        
       </Card>
     );
}

export default PaymentSuccessPage;