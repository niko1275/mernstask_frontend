import React, { useEffect } from 'react'
import { FormularioColaborador } from '../components/FormularioColaborador'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { Alerta } from '../components/Alerta';

export const NuevoColaborador = () => {
    const {obtenerProyecto,proyecto,cargando,colaborador,agregarColaborador, alerta} = useProyectos();
    const params = useParams();

    useEffect(()=>{
        obtenerProyecto(params.id)
     },[])

     if(!proyecto?._id) return <Alerta alerta={alerta}/>
  return (
    
    
    <>
       
        <h1 className='font-black text-4xl '>
            Añadir colaborador al proyecto: {proyecto.nombre}
        </h1>

        <div className='mt-10 flex justify-center'>
            <FormularioColaborador/>
        </div>

        {
            cargando ? <p className='text-center'><Spinner/> </p> : colaborador?._id && (
                <div className='flex justify-center mt-10'>
                    <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full'>
                        <h2 className='text-center text-2xl font-bold'>
                            Resultado
                            <div className='flex justify-between items-center'>
                                <p>{colaborador.nombre}</p>

                                <button onClick={()=>agregarColaborador(colaborador.email)} type='button' className='bg-sky-600 font-bold text-white p-3 rounded-lg text-sm'>Agregar al proyecto</button>
                            </div>
                        </h2>
                    </div>
                </div>
            )
        }
    </>
  )
}
