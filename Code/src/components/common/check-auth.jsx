import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

function CheckAuth({ isAuthenticated, user, children, isLoading }) {
  
  if(isLoading) return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-yellow-600 rounded-full"></div>
          </div>
        </div>
        <Skeleton className="w-32 h-4 bg-yellow-600" />
        <Skeleton className="w-48 h-4 bg-yellow-600" />
      </div>
    </div>
  )
  
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
