import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/orders-slice";
import { Badge } from "../ui/badge";
function AdminOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { isLoading, orderList, orderDetails } = useSelector((state)=> state.adminOrders);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getOrderId){
    // console.log(getOrderId);
    dispatch(getOrderDetailsForAdmin({id : getOrderId}));
    
  }
  useEffect(()=>{
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(()=>{
    if(orderDetails){
      setOpenDetailsDialog(true);
    }
  }, [orderDetails])
  console.log(orderDetails, 'orderDetails');
  
  return (
    <Card className='bg-[#0d0c0cfd] text-white'>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-white">Oder ID</TableHead>
              <TableHead className="text-white">Oder Date</TableHead>
              <TableHead className="text-white">Oder Status</TableHead>
              <TableHead className="text-white">Oder Price</TableHead>
              <TableHead className="text-white">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
            {orderList?.map((orderItem) => (
              <TableRow className="hover:bg-transparent">
                <TableCell>{orderItem?._id}</TableCell>
                <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      orderItem?.orderStatus === "confirmed"
                        ? "bg-green-500" :
                         orderItem?.orderStatus === "rejected"
                        ? "bg-red-600"
                        : "bg-white"
                    } text-black`}
                  >
                    {orderItem?.orderStatus}
                  </Badge>{" "}
                </TableCell>
                <TableCell>${orderItem?.totalAmount}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleFetchOrderDetails(orderItem._id)}
                    className="bg-yellow-600 hover:bg-yellow-600 text-white font-semibold cursor-pointer"
                  >
                    View Details
                  </Button>
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={() => {
                      dispatch(resetOrderDetails());
                      setOpenDetailsDialog(false);
                    }}
                  >
                    <AdminOderDetailsView orderDetails={orderDetails}/>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrders;
