import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





const initialState = ({
    isAthenticated : false,
     isLoading : true,
    user : null,
    token : null // only add this because i  need to buy custom domain and use https to set cookie with secure flag otherwise it will not work in production
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
// export const checkAuth = createAsyncThunk('/auth/checkauth',
//     async() => {
    
//             const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
//                 {
//                     withCredentials : true,
//                     headers : {
//                         'Cache-Control' : 'no-store, no-cache, must-revalidate, proxy-revalidate'
//                     }
//                 }
//             ) 
            
//             return response.data
        
//     }
// )  
// we need to add token as authorization header because we are not using cookie to store token in production because of secure flag issue and we are storing token in session storage instead

export const checkAuth = createAsyncThunk('/auth/checkauth',
    async(token, { rejectWithValue }) => {
        if (typeof token !== "string" || !token.trim()) {
            return rejectWithValue({ message: "Missing authentication token" });
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
                {
                    
                    headers : {
                        Authorization : `Bearer ${token}`,
                        'Cache-Control' : 'no-store, no-cache, must-revalidate, proxy-revalidate'
                    },
                    timeout: 10000
                }
            ) 
            
            return response.data
        } catch (error) {
            sessionStorage.removeItem("token");
            return rejectWithValue(error.response?.data || { message: "Unable to verify authentication" });
        }
    }
)


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {
        setUser:(state, action)=> {
            state.user = action.payload
        },
        resetTokenAndCredientials : (state)=>{
            state.token = null;
            state.isAthenticated = false;
            state.isLoading = false;
            state.user = null;
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
            state.token = action.payload.token, // only add this because i  need to buy custom domain and use https to set cookie with secure flag otherwise it will not work in production
            sessionStorage.setItem('token', action.payload.token), // only add this because i  need to buy custom domain and use https to set cookie with secure flag otherwise it will not work in production
            state.isAthenticated = action.payload.success ? true : false,
            state.user = action.payload.success ? action.payload.user : null
        }).addCase(loginUser.rejected, (state)=>{
            state.isLoading= false,
            state.isAthenticated = false, 
            state.user = null
             state.token = null
        }).addCase(checkAuth.pending, (state)=>{
            state.isLoading = true
        }).addCase(checkAuth.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.isAthenticated = action.payload.success ? true : false,
            state.user = action.payload.success ? action.payload.user : null
        }).addCase(checkAuth.rejected, (state)=>{
            state.isLoading= false,
            state.isAthenticated = false, 
            state.user = null,
            state.token = null
        }).addCase(logoutUser.pending, (state)=>{
            state.isLoading = true
        }).addCase(logoutUser.fulfilled, (state)=>{
            sessionStorage.removeItem('token');
            state.isLoading = false,
            state.isAthenticated = false,
            state.user = null,
            state.token = null
        })
    }
    
})

export const {setUser, resetTokenAndCredientials} = authSlice.actions;

export default authSlice.reducer;
