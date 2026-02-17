import { Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AuthLayout from "./components/auth/layout";
import CheckAuth from "./components/common/check-auth";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrder from "./pages/admin-view/orders";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingList from "./pages/shopping-view/listing";
import ShoppingCheckOut from "./pages/shopping-view/checkout";
import UnAthPage from "./pages/unauth-page";
import AdminLayout from "./components/admin-view/layout";
import ShoppingLayout from "./components/shopping-view/layout";
import NonFound from "./pages/non-found";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import PayPalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import PaypalCancelPage from "./pages/shopping-view/paypal-cancel";
import SearchPage from "./pages/shopping-view/search";



function App() {

  const dispatch = useDispatch();
  const { user, isAthenticated, isLoading } = useSelector((state) => state.auth); 
  
  // const isAthenticated = true
  // const isLoading = false
  // const user = {
  //   name : 'Abdulfatai',
  //   role : 'admin'
  // }
  
  
   useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
   <div className="flex flex-col overflow-hidden bg-white w-screen">
       <Toaster position="top-left" />
      <Routes>
        <Route
        path="/" element={<CheckAuth isAuthenticated={isAthenticated}   user={user} isLoading={isLoading}>
          
        </CheckAuth>}>
          
        </Route>
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAthenticated}   user={user} isLoading={isLoading}><AuthLayout /></CheckAuth>}> 
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} /> 
        </Route>

        <Route path="/admin" element={<CheckAuth isAuthenticated={isAthenticated}   user={user} isLoading={isLoading}><AdminLayout/></CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrder />} /> 
        </Route>

        <Route path="/shop" element={<CheckAuth isAuthenticated={isAthenticated}  user={user} isLoading={isLoading}><ShoppingLayout/></CheckAuth>}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="list" element={<ShoppingList />} />
          <Route path="checkout" element={<ShoppingCheckOut />} />
          <Route path="paypal-return" element={<PayPalReturnPage />} />
          <Route path="paypal-cancel" element={<PaypalCancelPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
           <Route path="search" element={<SearchPage />} />
        </Route>
    
        <Route path="/unauth-page" element={<UnAthPage />} />
        <Route path="*" element={<NonFound />} />
      </Routes>
    </div>
  )
}

export default App
