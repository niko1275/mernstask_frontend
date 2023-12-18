import React from 'react'
import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Busqueda from './Busqueda'
import useAuth from '../hooks/useAuth'

export const Header = () => {
    const{handleBuscador,cerrarSesionProyectos}=useProyectos();
    const {cerrarSesionAuth} = useAuth();


    const handleCerrarSesion = ( )=>{
        cerrarSesionAuth();
        cerrarSesionProyectos();
        localStorage.removeItem('token');
    }
  return (
    <header className='px-4 py-5 bg-white border-b' >
        <div className='md:flex md:justify-between'>
            <h2 className='text-4xl text-sky-600 font-black text-center'>
                Uptask
            </h2>
            
            <div className='flex items-center gap-4 flex-col md:flex-row'> 

            <button onClick={handleBuscador} type='button' className='font-bold rounded uppercase mt-4 sm:mt-0'>
            Buscar proyecto
            </button>
                <Link to='/proyectos' className='font-bold uppercase '> 
                    Proyectos
                </Link>

                <button onClick={handleCerrarSesion} type='button' className='bg-sky-600 text-sm p-3 rounded uppercase font-bold text-white'>Cerrar sesion</button>

                <Busqueda/>
            </div>

        </div>
       

     
    </header>
  )
}
