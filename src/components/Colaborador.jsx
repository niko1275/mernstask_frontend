
import React from 'react'
import useProyectos from '../hooks/useProyectos'

export const Colaborador = ({colaborador}) => {   

  const {handleModalEliminarColaborador,modalEliminarColaborador} = useProyectos();
  
  const {nombre,email} = colaborador;
  return (
    <>
        <div className=' bg-neutral-700 rounded-xl p-5 flex justify-between items-center shadow-2xl'>
            <div className=''>
                <p className='font-bold mb-1 text-xl text-white'>{nombre}</p>
                <p className='text-lg text-gray-700 text-white'>{email}</p>
            </div>
            <div className=''>
                <button onClick={()=>handleModalEliminarColaborador(colaborador)}  className='roundedshadow-xl p-2 text-white font-bold'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                                                                                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                                                                                              </svg></button>
            </div>
        </div>
    </>
  )
}
