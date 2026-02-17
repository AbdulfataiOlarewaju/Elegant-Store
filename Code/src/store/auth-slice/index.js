import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





const initialState = ({
    isAthenticated : false,
     isLoading : true,
    user : null,
});


export const registerUser = createAsyncThunk('/auth/register',
    async(FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,
                FormData, {
                    withCredentials : true
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data) 
        }
    }
)
export const loginUser = createAsyncThunk('/auth/login',
    async(FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,
                FormData, {
                    withCredentials : true
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const logoutUser = createAsyncThunk('/auth/logout',
    async() => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`,
                {}, {
                    withCredentials : true
                }
            )
            return response.data
    }
)
export const checkAuth = createAsyncThunk('/auth/checkauth',
    async() => {
    
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
                {
                    withCredentials : true,
                    headers : {
                        'Cache-Control' : 'no-store, no-cache, must-revalidate, proxy-revalidate'
                    }
                }
            )
            return response.data
        
    }
)


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {
        setUser:(state, action)=> {

        }
    },
    extraReducers : (builder)=> {
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.isAthenticated = false,
            state.user = null
        }).addCase(registerUser.rejected, (state)=>{
            state.isLoading= false,
            state.isAthenticated = false,
            state.user = null
        }).addCase(loginUser.pending, (state)=>{
            state.isLoading = true
        }).addCase(loginUser.fulfilled, (state, action)=>{
            console.log(action);
            state.isLoading = false,
            state.isAthenticated = action.payload.success ? true : false,
            state.user = action.payload.success ? action.payload.user : null
        }).addCase(loginUser.rejected, (state)=>{
            state.isLoading= false,
            state.isAthenticated = false, 
            state.user = null
        }).addCase(checkAuth.pending, (state)=>{
            state.isLoading = true
        }).addCase(checkAuth.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.isAthenticated = action.payload.success ? true : false,
            state.user = action.payload.success ? action.payload.user : null
        }).addCase(checkAuth.rejected, (state)=>{
            state.isLoading= false,
            state.isAthenticated = false, 
            state.user = null
        }).addCase(logoutUser.pending, (state)=>{
            state.isLoading = true
        }).addCase(logoutUser.fulfilled, (state)=>{
            state.isLoading = false,
            state.isAthenticated = false,
            state.user = null
        })
    }
    
})

export const {setUser} = authSlice.actions;

export default authSlice.reducer;