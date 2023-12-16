import React from 'react'
import useProyectos from '../hooks/useProyectos'
import { formatearFecha } from '../helpers/formatearFecha';
import useAdmin from '../hooks/useAdmin';




export const Tarea = ({tarea}) => {

    const {nombre,descripcion,fechaEntrega,_id,prioridad,estado} = tarea;

    const admin = useAdmin();
    const {handleModalEditarTarea,handleModalEliminarTarea,completarTarea} = useProyectos();

  return (
    <div className='border-b p-3 flex justify-between items-center'>
        <div className='flex flex-col items-start'>
            <p className='text-xl font-bold'>{nombre}</p>
            <p className='text-xl text-gray-500'>{descripcion}</p>
            <p className='text-xl font-bold'>{formatearFecha(fechaEntrega)}</p>
            <p className='text-xl text-gray-500 mb-2'>Prioridad: {prioridad}</p>
            {
                estado && 
            <p className='text-xs bg-green-500 rounded p-1 font-bold text-white'>Completada por: {tarea.completado.nombre}</p>
            }
        </div>
       

      
        <div className=' flex gap-2 flex-col lg:flex-row'>
        { admin && (
            <button onClick={()=>handleModalEditarTarea(tarea)} className='rounded bg-sky-800 p-2 text-white font-bold'>Editar</button>
            )}

            {
                estado ? <button onClick={()=>completarTarea(_id)} className='rounded bg-gray-800 p-2 text-white font-bold'>Incompleta</button> : <button onClick={()=>completarTarea(_id)} className='rounded bg-sky-500 p-2 text-white font-bold'>Completa</button>
            }
            
            { admin && (
            <button onClick={()=>handleModalEliminarTarea(tarea)} className='rounded bg-red-500 p-2 text-white font-bold'>Borrar</button>
            )}
        </div>

     
    </div>
  )
}
