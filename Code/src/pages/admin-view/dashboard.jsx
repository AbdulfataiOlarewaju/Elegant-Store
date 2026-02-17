import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "@/store/admin/products-slice";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/orders-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminOderDetailsView from "@/components/admin-view/order-details";
import { Package, ShoppingCart, DollarSign } from "lucide-react";

function AdminDashboard() {
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.adminProducts);
    const { orderList, orderDetails } = useSelector((state) => state.adminOrders);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    useEffect(() => {
        dispatch(fetchAllProduct());
        dispatch(getAllOrdersForAdmin());
    }, [dispatch]);

    useEffect(() => {
        if (orderDetails) {
            setOpenDetailsDialog(true);
        }
    }, [orderDetails]);

    const totalProducts = productList.length;
    const totalOrders = orderList.length;
    const totalRevenue = orderList.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const recentOrders = orderList.slice(0, 5); // Last 5 orders

    function handleFetchOrderDetails(orderId) {
        dispatch(getOrderDetailsForAdmin({ id: orderId }));
    }

    return (
        <div className="flex flex-col rounded-lg border border-neutral-200 text-white  p-6 shadow-sm space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-[#0d0c0cfd] text-white border-neutral-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-5 w-5 text-neutral-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#0d0c0cfd] text-white border-neutral-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingCart className="h-5 w-5 text-neutral-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#0d0c0cfd] text-white border-neutral-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-5 w-5 text-neutral-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-[#0d0c0cfd] text-white border-neutral-200">
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-white">Order ID</TableHead>
                                <TableHead className="text-white">Order Date</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white">Amount</TableHead>
                                <TableHead className="text-white">
                                    <span className="sr-only">Details</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map((order) => (
                                <TableRow key={order._id} className="hover:bg-transparent">
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>{order.orderDate.split("T")[0]}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`${
                                                order.orderStatus === "confirmed"
                                                    ? "bg-green-500"
                                                    : order.orderStatus === "rejected"
                                                    ? "bg-red-600"
                                                    : "bg-white"
                                            } text-black`}
                                        >
                                            {order.orderStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${order.totalAmount}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleFetchOrderDetails(order._id)}
                                            className="bg-yellow-600 hover:bg-yellow-600 text-white font-semibold cursor-pointer"
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                            dispatch(resetOrderDetails());
                            setOpenDetailsDialog(false);
                        }}
                    >
                        <AdminOderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminDashboard;
