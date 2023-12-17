
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import { Spinner } from '../components/Spinner';
import MyModal from '../components/ModalFormulario';
import ModalFormulario from '../components/ModalFormulario';
import { Tarea } from '../components/Tarea';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import { Alerta } from '../components/Alerta';
import { Colaborador } from '../components/Colaborador';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';




export const Proyecto = () => {
  
  const {obtenerProyecto,proyecto,cargando,handleModalTarea,alerta} = useProyectos();
  const admin = useAdmin();
  const params = useParams();
  const {id} = params
  const {nombre} = proyecto;
  const {msg } = alerta;
  
  useEffect(()=>{
    obtenerProyecto(id)
  },[])


  return (
 
    cargando ?  <Spinner/>
              :<>
                <div className='flex justify-between'>
                   <h1 className='text-4xl font-bold'>{nombre}</h1>
                   {
                    admin && (

                   
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>

                  <Link to={`/proyectos/editar/${id}`}>Editar</Link>

                  </div>
                    )}

                </div>
              
                { admin && ( 
                <button onClick={handleModalTarea} className='bg-sky-500 rounded-lg p-3 text-white md:auto uppercase text-sm mt-5 font-bold text-center flex gap-1 items-center justify-center w-full md:w-auto'>Nueva tarea  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                  )}

              <p className='font-black text-2xl mt-10'> Tareas del proyecto</p>

              
             
              <div className='bg-white shadow mt-10 rounded-lg '>
                {
                  proyecto.tareas?.length ? proyecto.tareas?.map( tarea => <Tarea key={tarea._id} tarea={tarea} />) : <p className='p-3 font-bold'> No hay tareas en este proyecto</p>

                }
              </div>

              {
                admin && (
                  <>
          
              
              <div className='flex items-center justify-between '>
                <p className='font-bold text-xl mt-10'> Colaboradores</p> 
                <Link className='uppercase font-bold text-gray-400 hover:text-black' to={`/proyectos/nuevo-colaborador/${proyecto._id}`}>
                  Añadir
                </Link>
              </div>

              <div className='bg-white shadow mt-10 rounded-lg '>
                {
                  proyecto.colaboradores?.length ? proyecto.colaboradores?.map( colaborador => <Colaborador key={colaborador._id} colaborador={colaborador} />) : <p className='p-3 font-bold'> No hay colaboradores en este proyecto</p>

                }
              </div>
              </>
                    ) }
              
             
              <ModalEliminarColaborador/>
              <ModalFormulario/>
              <ModalEliminarTarea/>

              
              </> 
  
  )
}
