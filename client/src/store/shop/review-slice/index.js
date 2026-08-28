
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"




const initialState = {
    isLoading : false,
    reviews : []
}


export const addNewReview = createAsyncThunk('review/addNewReview', async (formData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/review/add`, formData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
})


export const getReviews = createAsyncThunk('review/ getReviews', async ({id}) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/review/get/${id}`);
    console.log(response.data);
  return response.data;
  
})


const reviewSlice = createSlice({
    name : 'reviewSlice',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(getReviews.pending, (state)=>{
            state.isLoading = true;
        }).addCase(getReviews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.reviews = action.payload.data;
        }).addCase(getReviews.rejected, (state)=>{
            state.isLoading = false;
            state.reviews = [];
        })
    }
})



export default reviewSlice.reducer;