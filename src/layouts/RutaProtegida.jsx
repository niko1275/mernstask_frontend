import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export const RutaProtegida = () => {
  const { auth, cargando } = useAuth();


  if (cargando) return 'cargando...';
  
  return (
    <>
      {auth?._id || auth?.usuario ?
        <div className='bg-[#1A1A1A] min-h-screen w-full '>
          <div className='flex '>
            <Sidebar />
            <main className=' flex-1 '>
              <Outlet />
            </main>
          </div>
        </div>

        :
        <Navigate to='/' />}
    </>
  )
}
