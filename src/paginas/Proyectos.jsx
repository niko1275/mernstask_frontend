import React, { useEffect } from 'react'
import useProyectos from '../hooks/useProyectos'
import { PreviewProyecto } from '../components/PreviewProyecto';
import { useParams } from 'react-router-dom';
import { Alerta } from '../components/Alerta';





export const Proyectos = () => {

  const { proyectos,alerta } = useProyectos();
  const {msg} = alerta;



  return (
    <>
    <div className=' min-h-screen flex'>
      <div className=' bg-[#212121] border m-10 w-full rounded-xl p-10 border-neutral-700 border-2 '>
        <h1 className='text-4xl font-bold mb-10 text-white '>All Projects </h1>
          
          {msg && <Alerta alerta={alerta} />}

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 '>
          {proyectos.length ? (
            proyectos.map(proyecto => (
              <div key={proyecto._id} className='bg-neutral-700 shadow-2xl  shadow rounded-lg flex flex-col p-2 justify-between border border-zinc-500 border-2 '>
                <PreviewProyecto proyecto={proyecto} />
              </div>
            ))
          ) : (
            <p className='text-center text-gray-600 uppercase font-bold p-10 text-xl text-white'>
              No hay proyectos
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
