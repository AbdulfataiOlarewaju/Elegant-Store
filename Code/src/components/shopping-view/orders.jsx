import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-deatils";
import { Dialog } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/orders-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const { orderId } = useSelector((state) => state.shopOrder);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    // Dispatch an action to fetch orders
    dispatch(getAllOrders({ userId: user.id }));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);
  console.log(orderDetails, "orderDetails");
  function handleOpenDetailsDialog(getOrderId) {
    dispatch(getOrderDetails({ id: getOrderId }));
  }

  return (
    <Card className="bg-[#0d0c0cfd] text-white">
      <CardHeader>
        <CardTitle className="text-yellow-600">Order History</CardTitle>
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
                    onClick={() => handleOpenDetailsDialog(orderItem._id)}
                    className="bg-yellow-600 hover:bg-yellow-600 text-black font-semibold cursor-pointer"
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
                    <ShoppingOrderDetailsView orderDetails={orderDetails}/>
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

export default ShoppingOrders;
