import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading : false,
    orderList : [],
    orderDetails : null
}

export const getAllOrdersForAdmin = createAsyncThunk("/order/getAllOrdersForAdmin", async()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/get`);
    return response.data;
})
export const getOrderDetailsForAdmin = createAsyncThunk("/order/getOrderDetailsForAdmin", async({id})=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`);
    return response.data;
})

export const updateOrderStatusForAdmin = createAsyncThunk("/order/updateOrderStatusForAdmin", async({id, orderStatus})=>{
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`, {orderStatus});
    return response.data;
})

const adminOrdersSlice = createSlice({
    name : 'adminOrders',
    initialState,
    reducers : {
        resetOrderDetails : (state, action)=>{
            state.orderDetails = null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getAllOrdersForAdmin.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllOrdersForAdmin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getAllOrdersForAdmin.rejected, (state)=>{
            state.isLoading = false;
            state.orderList = [];
        })
        .addCase(getOrderDetailsForAdmin.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getOrderDetailsForAdmin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        }).addCase(getOrderDetailsForAdmin.rejected, (state)=>{
            state.isLoading = false;
            state.orderDetails = null;
        })
        .addCase(updateOrderStatusForAdmin.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateOrderStatusForAdmin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        }).addCase(updateOrderStatusForAdmin.rejected, (state)=>{
            state.isLoading = false;
        })
    }
})
export const {resetOrderDetails} = adminOrdersSlice.actions;
export default adminOrdersSlice.reducer;