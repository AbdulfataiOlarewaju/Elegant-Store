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

const normalizeToken = (token) => {
    if (typeof token !== 'string') return null;
    const cleanedToken = token.trim();
    return cleanedToken && cleanedToken !== 'null' && cleanedToken !== 'undefined' ? cleanedToken : null;
};

export const checkAuth = createAsyncThunk('/auth/checkauth',
    async(token, { rejectWithValue }) => {
        const safeToken = normalizeToken(token);
        if (!safeToken) {
            return rejectWithValue({ success: false, message: 'Unauthorized User!' });
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
                {
                    headers : {
                        Authorization : `Bearer ${safeToken}`,
                        'Cache-Control' : 'no-store, no-cache, must-revalidate, proxy-revalidate'
                    }
                }
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { success: false, message: 'Unauthorized User!' });
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
            state.token = null,
            state.isAthenticated = false,  
            state.user = null;
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('token');
            }
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
            const nextToken = action.payload?.token;
            state.isLoading = false,
            state.token = nextToken || null,
            state.isAthenticated = action.payload?.success ? true : false,
            state.user = action.payload?.success ? action.payload.user : null;

            if (nextToken && typeof window !== 'undefined') {
                sessionStorage.setItem('token', JSON.stringify(nextToken));
            } else if (typeof window !== 'undefined') {
                sessionStorage.removeItem('token');
            }
        }).addCase(loginUser.rejected, (state)=>{
            state.isLoading= false,
            state.isAthenticated = false, 
            state.user = null;
            state.token = null;
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('token');
            }
        }).addCase(checkAuth.pending, (state)=>{
            state.isLoading = true
        }).addCase(checkAuth.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.isAthenticated = action.payload.success ? true : false,
            state.user = action.payload.success ? action.payload.user : null
        }).addCase(checkAuth.rejected, (state)=>{
            state.isLoading= false,
            state.isAthenticated = false, 
            state.user = null;
            state.token = null;
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('token');
            }
        }).addCase(logoutUser.pending, (state)=>{
            state.isLoading = true
        }).addCase(logoutUser.fulfilled, (state)=>{
            state.isLoading = false,
            state.isAthenticated = false,
            state.user = null
        })
    }
    
})

export const {setUser, resetTokenAndCredientials} = authSlice.actions;

export default authSlice.reducer;