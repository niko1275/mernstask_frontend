import React from 'react'
import { FormularioProyecto } from '../components/FormularioProyecto'

export const NuevoProyecto = () => {
  return (
    <>
      <div className='w-full  h-full p-10'>
        <div className='bg-[#212121] border-neutral-700 border-2 h-full rounded-xl border '>
          <h1 className='font-bold text-4xl p-10 text-white '>Crear Proyecto</h1>

          <div className='mt-8 flex justify-center mx-auto'>
            <FormularioProyecto/>
          </div>
        </div>
      </div>
    </>
  )
}
