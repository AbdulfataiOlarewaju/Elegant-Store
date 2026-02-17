import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children, isLoading }) {
  
  if(isLoading) return <div>Loading...</div>
  
  // if(isLoading) return <Skeleton className='w-[800px] bg-black height-[600px] '/>
  
  const location = useLocation();
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("register")
    )
  ) {
    return <Navigate to='/auth/login'/>
  }
  if(location.pathname === '/'){
    if(!isAuthenticated){
      return <Navigate to='/auth/login'/>
    }   if(user?.role === 'admin'){
      return <Navigate to='/admin/dashboard'/>
    } else {
      return  <Navigate to='/shop/home'/>
    }
  }

  if(isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))){
    if(user?.role === 'admin'){
      return <Navigate to='/admin/dashboard'/>
    } else {
      return  <Navigate to='/shop/home'/>
    }
  }
  if(isAuthenticated &&  user?.role !== 'admin' && location.pathname.includes('admin')) {
    return <Navigate to='/unauth-page'/>
  }
  if(isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')){
    return <Navigate to='/admin/dashboard'/>
  }
  return <>{children}</>
}

export default CheckAuth;
