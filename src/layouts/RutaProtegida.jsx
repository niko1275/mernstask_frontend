import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export const RutaProtegida = () => {
    const {auth,cargando}= useAuth();
  
    const {usuario} = auth;
    console.log(usuario)
    if(cargando) return 'cargando...'
  return (
    <>
        { usuario ? 
                  <div className='bg-gray-100'>
                      <Header/>
                      <div className='md:flex md:min-h-screen'>
                        <Sidebar/>
                        <main className='flex-1 p-10'>
                          <Outlet/>
                        </main>
                      </div>
                  </div> 
                  
                  : 
                  <Navigate to='/'/>}
    </>
  )
}
