import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const PreviewProyecto = ({proyecto}) => {
  const {auth} = useAuth();
  const {nombre,_id,cliente,creador} = proyecto;
   
  return (
    <div className='border-b p-5 flex justify-between'>

      <div className='flex items-center '>
        <p className=''>{nombre}  <span className='text-gray-500 uppercase'> {''} {cliente}</span></p>
        {
          auth.usuario._id !== creador && (
            <p className=' mx-2 bg-green-500 rounded-lg p-1 font-bold text-white'>Colaborador</p>
          )
        }

      </div>
        {/* <p className='flex-1'>{nombre}  <span className='text-gray-500 uppercase'> {''} {cliente}</span></p> */}
    
        <Link to={`${_id}`} className='font-bold '>Ver Proyecto</Link>
    </div>
  )
}
