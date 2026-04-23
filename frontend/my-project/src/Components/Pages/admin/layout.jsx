import React from 'react'
import { assets } from '../../../assets/assets'
import Sidebar from '../../admin/sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext'

const Layout = () => {

  
  const { navigate, logout } = useAppContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
    <div className='flex justify-between items-center p-4 shadow-sm'>
      
      <img
        src={assets.logo}
        alt="Admin Layout"
        className='w-32 sm:w-40 cursor-pointer'
        onClick={() => navigate("/")}
      />

      <button
        onClick={handleLogout}
        className='text-sm text-white bg-primary px-4 py-2 rounded-full cursor-pointer hover:bg-primary/80 transition'
      >
        Logout
      </button>
    </div>

    <div className='flex h-[calc(100vh-70px)]'>
      <div><Sidebar /></div>
      <Outlet />

    </div>
  </>
    
  )
}

export default Layout
