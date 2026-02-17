import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    productList : [],
    isLoading: false
}

// add
export const addNewProduct = createAsyncThunk('products/addProduct', 
   async (formData)=>{
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`, formData, {
        headers : {
            'content-Type' : 'application/json'
        }
    });
    return result.data
});

// fetch
export const fetchAllProduct = createAsyncThunk('products/fetchProducts', 
   async ()=>{
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`);
    return result.data
});

// edit
export const editProduct = createAsyncThunk('products/editProduct', 
   async ({formData, id})=>{
    const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`, formData, {
        headers : {
            'content-Type' : 'application/json'
        }
    });
    return result.data
})

// delete
export const deleteProduct = createAsyncThunk('products/addprocucts', 
   async ({id})=>{
    const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`);
    return result.data
})


const adminProductsSlice = createSlice({
    name : 'adminProducts',
    initialState,
    reducers : {},
    extraReducers : (builder)=> {
      builder.addCase(fetchAllProduct.pending, (state)=>{
        state.isLoading = true
      }).addCase(fetchAllProduct.fulfilled, (state, action)=>{
        console.log(action.payload);
        
        state.isLoading = false,
        state.productList = action.payload.data
      }).addCase(fetchAllProduct.rejected, (state, action)=>{
        console.log(action.payload);
        
        state.isLoading = false,
        state.productList = []
      })
    }
})

export default adminProductsSlice.reducer;
// export const {} = 