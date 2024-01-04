import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const PreviewProyecto = ({proyecto}) => {
  const {auth} = useAuth();
  const {nombre,_id,cliente,creador} = proyecto;
   
  return (
    <>
        <div>
          <p className='text-xl font-semibold text-white mt-2 '>{nombre}</p>
          <span className='text-gray-500 uppercase  text-white'>{cliente}</span>
        </div>
       
        <div className='flex justify-between mt-5'>
          <Link
            to={`${_id}`}
            className='text-blue-500 hover:underline font-bold '
          >
            Ver Proyecto
          </Link>
      
          {auth?.usuario?._id !== creador && auth?._id !== creador && (
            <p className='ml-2 bg-green-500 rounded-lg p-1 font-bold text-white'>Colaborador</p>
          )}
        </div>
        
    </>
  )
}
