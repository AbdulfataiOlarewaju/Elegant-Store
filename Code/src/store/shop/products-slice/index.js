import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    productList : [],
    productDetails : null,
}

// getFIlterProducts
export const fetchFilteredProducts = createAsyncThunk('products/fetchFilteredProducts', 
   async ({filterParams, sortParams})=>{
    const query = new URLSearchParams({
        ...filterParams,
        sortBy : sortParams
    }) 
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`);
    return result.data
});
export const fetchProductsProductDetails = createAsyncThunk('products/fetchProductsProductDetails', 
   async (id)=>{
     
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`);
    return result.data
});
 
const shoppingProductsSlice = createSlice({ 
    name : 'shopProducts',
    initialState,
    reducers: {
        setProductDetails : (state)=>{
            state.productDetails = null;
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchFilteredProducts.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchFilteredProducts.fulfilled, (state, action)=>{
            console.log(action.payload)

            state.isLoading = false;
            state.productList = action.payload.data;
        }).addCase(fetchFilteredProducts.rejected, (state)=>{
            state.isLoading = false;
            state.productList = [];
        }).addCase(fetchProductsProductDetails.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchProductsProductDetails.fulfilled, (state, action)=>{
            console.log(action.payload)

            state.isLoading = false;
            state.productDetails = action.payload.data;
        }).addCase(fetchProductsProductDetails.rejected, (state)=>{
            state.isLoading = false;
            state.productDetails = null;
        })
     
    }
})

export const {setProductDetails} = shoppingProductsSlice.actions;

export default shoppingProductsSlice.reducer;

