
import React, { useState } from 'react'
import useProyectos from '../hooks/useProyectos';
import { Alerta } from './Alerta';

export const FormularioColaborador = () => {

    const [email,setEmail]= useState('');
    const {mostrarAlerta,alerta,submitColaborador} = useProyectos();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email === ''){
            mostrarAlerta({
                msg:'Email es obligatorio',
                error:true
            })
            return
        }

        await submitColaborador(email);
    }

    const {msg} = alerta;
  return (

   
    <form onSubmit={handleSubmit} className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full'>
        {msg && <Alerta alerta={alerta}/>}
        <div>
            <label className='font-bold w-full text-sm uppercase' htmlFor='email'>Email Colaborador</label>
            <input type='email' className='w-full border rounded-lg p-2 mb-4 mt-1' placeholder='Email del usuario' id='email' value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        <input
        type='submit'
        value='Buscar colaborador'
        className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer w-full'
      />

        
    </form>
  )
}
