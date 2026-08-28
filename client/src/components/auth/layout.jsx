import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className='flex min-h-screen w-screen'>
        <div className='hidden lg:flex items-center justify-center bg-black w-1/2 px-12'>
        <div className='space-y-6 text-center text-primary-foreground'>
            <h1 className='text-4xl font-extrabold tracking-tight text-yellow-600'><i>Welcome to Elegant Store</i></h1>
        </div>
        </div>
        <div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
            <Outlet/>
        </div>
    </div>
  )
}

export default AuthLayout