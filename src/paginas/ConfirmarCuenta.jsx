import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alerta } from '../components/Alerta';
import { useParams,Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

export const ConfirmarCuenta = () => {

  const [alerta,setAlerta] = useState({});
  const [cuentaConfirmada,setCuentaConfirmada] = useState(false);

  const params= useParams();
  const {id} = params;

  useEffect(()=>{
    
    const confirmarCuenta = async ()=>{
      try{
        const url = `/usuarios/confirmar/${id}`;
        const {data} = await clienteAxios(url);
        console.log("se llamo 1"+data);
        setAlerta({
          msg:data.msg,
          error:false
        })
        setCuentaConfirmada(true)
        
      }catch(error){
        setAlerta({
          msg:error.response.data.msg,
          error:true

        })


      }
    }
    confirmarCuenta();
  },[])

  const {msg} = alerta;

  return (
    <>
        <h1 className='text-sky-600 font-black text-6xl capitalize'>Confirma tu cuenta y comienza a crear tus
          <span className='text-slate-700'> proyectos</span>
        </h1>

        <div>

          {msg && <Alerta alerta={alerta}/>}
          {cuentaConfirmada &&  <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/'>¿Ya tienes una cuenta? <span className='text-sky-500 hover:text-sky-700'>Inicia Sesión</span></Link>}
        </div>

    </>
  )
}
