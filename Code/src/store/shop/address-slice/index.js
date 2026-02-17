import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    isLoading : false,
    addressList : []
}

export const addAdress = createAsyncThunk('address/AddAdress', async ({formData})=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/address/add`, formData)
    return response.data
})

export const fetchAdress = createAsyncThunk('address/fetchAdress', async (userId)=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`, )
    return response.data

})

export const updateAdress = createAsyncThunk('address/updateAdress', async ({formData, userId, addressId})=>{
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/address/edit/${userId}/${addressId}`, formData)
    return response.data

})


export const deleteAdress = createAsyncThunk('address/deleteAdress', async ({userId, addressId})=>{
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`)
    return response.data

})



const addAdressSlice = createSlice({
    name : 'address',
    initialState,
    reducers : {},
    extraReducers: (builer)=>{
        builer.addCase(addAdress.pending, (state)=>{
            state.isLoading = true
        }).addCase(addAdress.fulfilled, (state, action)=>{
            state.isLoading = false
            state.addressList.push(action.payload.data)
        }).addCase(addAdress.rejected, (state)=>{
            state.isLoading = false
        }).addCase(fetchAdress.pending, (state)=>{
            state.isLoading = true
        }).addCase(fetchAdress.fulfilled, (state, action)=>{
            state.isLoading = false
            state.addressList = action.payload.data
        }).addCase(fetchAdress.rejected, (state)=>{
            state.isLoading = false,
            state.addressList = []
        })
    }
})


export default addAdressSlice.reducer;