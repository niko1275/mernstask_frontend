import React from 'react'
import { FormularioProyecto } from '../components/FormularioProyecto'

export const NuevoProyecto = () => {
  return (
    <>
      <h1 className='font-bold text-4xl'>Crear Proyecto</h1>

      <div className='mt-8 flex justify-center'>
        <FormularioProyecto/>
      </div>
    </>
  )
}
