import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

export const NuevoPassword = () => {
  const params = useParams();
  const {token} = params;

  const [alerta, setAlerta] = useState({});
  const [tokenValido,setTokenValido] = useState(false);
  const [password,setPassword] = useState('');
  const [passwordModificado ,setpPasswordModificado] = useState(false);

  useEffect(()=>{
    const comprobarToken = async ()=>{
      try{
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        
        setTokenValido(true);
      }catch(error){
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }
    }
    comprobarToken();
  },[])

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(password.length < 6) {
      setAlerta({
        msg:"El password debe ser minimo de 6 caracteres",
        error:true
      })
      return
    };
    try{    
      const url = `/usuarios/olvide-password/${token}`
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({
        msg:data.msg,
        error:false
      })
      setpPasswordModificado(true);
    }catch(error){


    }
  }

  const {msg} = alerta;


  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Restablece tu password y no pierdas acceso a tus
      <span className='text-slate-700'> proyectos</span>
   </h1>

    {msg && <Alerta alerta={alerta}/>}

    {tokenValido && <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg px-10 py-10'>

    <div className='my-5 '>
            <label className='uppercase text-gray-500 text-xl block font-bold' htmlFor='password'>Nuevo password</label>
            <input type='text'
                  placeholder='Escribe tu nuevo password'
                  className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                  id='password'
                  value={password}
                  onChange={e=>setPassword(e.target.value)}>
                    
            </input>
    </div>
    <input type='submit' className='py-3 text-white uppercase font-bold bg-sky-600 rounded w-full hover:cursor-pointer hover:bg-sky-700 transition-colors mb-5' value='Guardar Nuevo password'/>

    </form>}

    {passwordModificado &&  <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/'>¿Ya tienes una cuenta? <span className='text-sky-500 hover:text-sky-700'>Inicia Sesión</span></Link>}


</>
  )
}
