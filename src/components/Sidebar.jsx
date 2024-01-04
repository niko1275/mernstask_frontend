import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useProyectos from '../hooks/useProyectos';
import { motion, useAnimation } from 'framer-motion';

export const Sidebar = () => {

  const {auth} = useAuth();

  const{handleBuscador,cerrarSesionProyectos}=useProyectos();
  const {cerrarSesionAuth} = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleCerrarSesion = ( )=>{
      cerrarSesionAuth();
      cerrarSesionProyectos();
      localStorage.removeItem('token');
  }
  const controls = useAnimation();
  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (

    <>
   
   <motion.aside
    className={`text-white rounded-lg w-[300px] max-xl:hidden flex min-h-screen pr-5 pl-10 py-10 `}
    initial={{ translateX: sidebarVisible ? 0 : 400 }}
    animate={{ translateX: sidebarVisible ? 0 : 400 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
      <div className='w-full h-full border rounded-xl flex flex-col items-center justify-between bg-[#212121] border-neutral-700 border-2 shadow-2xl  '>
        <div className='mt-10'>
         
          <p className='text-xl font-bold  '>
            Hola: {auth.nombre || auth?.usuario?.nombre}
          </p>
        </div>
        
    
        <div className='flex flex-col w-full'>
          <button className='w-ful uppercase font-bold hover:bg-gray-300 hover:text-black  p-3'>
          <Link
            to='crear-proyecto'
            className=''
          >
            Nuevo Proyecto
          </Link>

          </button>

          <button className='flex uppercase font-bold hover:bg-gray-300 items-center justify-center p-3 hover:border-r-4  hover:text-black hover:border-teal-700 relative'>
            <Link to='/proyectos' className='font-bold uppercase hover:bg-gray-300 '>
              Proyectos
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </button>
            
        </div>
        
          <div className='flex items-center font-bold mb-10 '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
          </svg>
          <button onClick={handleCerrarSesion}>
          Cerrar Sesion
          </button>
        </div>
      </div>
      
      </motion.aside>

    <button
        onClick={handleToggleSidebar}
        className={` fixed top-5 left-5 text-white`}
      >
        
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
     
      </button>
    </>
  );
  }