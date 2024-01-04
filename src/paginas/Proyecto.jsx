
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

  const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta } = useProyectos();
  const admin = useAdmin();
  const params = useParams();
  const { id } = params
  const { nombre } = proyecto;


  useEffect(() => {
    obtenerProyecto(id)
  }, [])


  return (

    cargando ? <Spinner />
      : <>
        <div className='  pr-10 pl-5 py-10 min-h-screen flex w-full'>
          <div className=' bg-[#212121] border w-full p-10 rounded-xl  border-neutral-700 border-2  '>
          <div className='flex justify-between '>
            <h1 className='text-2xl font-bold text-white '>{nombre}</h1>
            {
              admin && (
                <div className='text-gray-500 hover:text-black uppercase font-bold'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  <Link to={`/proyectos/editar/${id}`}>Editar</Link>

                </div>
              )}
          </div>
          <p className='text-2xl mt-10 text-white mb-4'> Tareas del proyecto</p>
          <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 '>
            {
              proyecto.tareas?.map(tarea => <Tarea key={tarea._id} tarea={tarea} />) 

            }
             
             {admin && (
            <button onClick={handleModalTarea} className=" mx-auto w-full border-gray-800 hover:border-black py-4 pr-4 h-[280px] " >
      
              <div className='  w-full h-full rounded-xl border-dashed border-4   border-gray-600 hover:border-sky-600 flex justify-center items-center'>
                <h2 className="text-xl text-white mb-4 ">+Nueva Tarea</h2>
                
              </div>
            </button>
            )}
            </div>
         

          {
            admin && (
              <>


                <div className='flex items-center justify-between '>
                  <p className='text-xl mt-10 text-white'> Colaboradores</p>
                  <Link className='uppercase font-bold text-gray-400 hover:text-black' to={`/proyectos/nuevo-colaborador/${proyecto._id}`}>
                    Añadir
                  </Link>
                </div>

                <div className='  mt-10 rounded-lg grid flex flex-col xl:grid-cols-5 gap-2 '>
                  {
                    proyecto.colaboradores?.length ? proyecto.colaboradores?.map(colaborador => <Colaborador key={colaborador._id} colaborador={colaborador} />) : <p className='p-3 font-bold'> No hay colaboradores en este proyecto</p>

                  }
                </div>
              </>
            )}


          <ModalEliminarColaborador />
          <ModalFormulario />
          <ModalEliminarTarea />
          </div>
        </div>
      </>

  )
}
