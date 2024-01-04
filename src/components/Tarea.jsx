import React from 'react'
import useProyectos from '../hooks/useProyectos'
import { formatearFecha } from '../helpers/formatearFecha';
import useAdmin from '../hooks/useAdmin';




export const Tarea = ({ tarea }) => {

    const { nombre, descripcion, fechaEntrega, _id, prioridad, estado } = tarea;

    const admin = useAdmin();
    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos();

    return (
        <div className='  rounded-xl h-[280px]  py-4 pr-4 w-full '>
            <div className='h-full rounded-xl p-5 shadow-2xl bg-neutral-700 border border-zinc-500 border-2 '>
                <div className='flex flex-col justify-between h-full '>
                    <div>
                        <p className='text-white font-bold'>{nombre}</p>
                        <p className='text-gray-500 text-white'>{descripcion}</p>
                    </div>
                    <div>
                  
                    </div>
                
                    <div>
                    
                    <p className='text-gray-500 text-white '>Prioridad: {prioridad}</p>
                    <p className='font-bold text-white'>{formatearFecha(fechaEntrega)}</p>
                    

                    <div className='flex justify-between mt-2'>
                        <div className='flex-col'>
                            {estado ? (
                                <button
                                  onClick={() => completarTarea(_id)}
                                  className='rounded-full bg-green-500 px-5  text-white'
                                    >
                                  Completa
                                </button>
                            ) : (
                                <button
                                onClick={() => completarTarea(_id)}
                                className='rounded-full bg-red-500  px-5   text-white'
                                >
                                Incompleta
                                </button>
                            )}



                             

                            {estado && (
                            <p className='text-xs rounded-full flex items-center font-bold ml-1 text-white mt-2 '>
                                Completada por: {tarea?.completado?.nombre}
                            </p>
                            )}

                        </div>

                        <div className=''>
                            {admin && (
                                <button
                                    onClick={() => handleModalEliminarTarea(tarea)}
                                    className='text-slate-300  font-bold'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </button>
                            )}
                            {admin && (
                                    <button
                                        onClick={() => handleModalEditarTarea(tarea)}
                                        className='text-slate-300 p-2  font-bold'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                    )}
                    
                        </div>
                    </div>

                    </div>
                  
                </div>
            </div>
        </div>
    )
}
