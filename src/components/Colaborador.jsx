
import React from 'react'
import useProyectos from '../hooks/useProyectos'

export const Colaborador = ({colaborador}) => {   

  const {handleModalEliminarColaborador,modalEliminarColaborador} = useProyectos();
  
  const {nombre,email} = colaborador;
  return (
    <>
        <div className='border-b p-5 flex justify-between items-center'>
            <div className=''>
                <p className='font-bold mb-1 text-xl'>{nombre}</p>
                <p className='text-lg text-gray-700'>{email}</p>
            </div>
            <div className=''>
                <button onClick={()=>handleModalEliminarColaborador(colaborador)}  className='rounded bg-red-500 p-2 text-white font-bold'>Borrar</button>
            </div>
        </div>
    </>
  )
}
