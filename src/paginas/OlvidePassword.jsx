import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
export const OlvidePassword = () => {


  const [email,setEmail] = useState('');
  const [alerta,setAlerta] = useState({});


  const handleSubmit = async (e)=>{
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({
        msg:"El Email es Obligatorio",
        error:true
      });
      return

    }
      try{
        const {data} = await clienteAxios.post(`/usuarios/olvide-password`,{email});
        console.log(data);
        setAlerta({
          msg:data.msg,
          erro:false
        })
       
      }catch(error){
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }
  }
  const {msg} = alerta;
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Recupera tu Acceso y no pierdas tus
        <span className='text-slate-700'> proyectos</span>
     </h1>
    <form className='my-10 bg-white shadow rounded-lg px-10 py-10' onSubmit={handleSubmit}>

        {msg && <Alerta alerta={alerta}/>}
   
        <div className='my-5 '>
            <label className='uppercase text-gray-500 text-xl block font-bold' htmlFor='email'>Email</label>
            <input type='email'
                   placeholder='Email de registro'
                   className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                   id='email'
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}>
                    
            </input>
        </div>

     

        <input type='submit' className='py-3 text-white uppercase font-bold bg-sky-600 rounded w-full hover:cursor-pointer hover:bg-sky-700 transition-colors mb-5' value='Enviar Instrucciones'/>

    </form>

    <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/'>¿Ya tienes una cuenta? <span className='text-sky-500 hover:text-sky-700'>Inicia Sesión</span></Link>
        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/registrar'>¿No tienes una cuenta? <span className='text-sky-500 hover:text-sky-700'>Regístrate</span></Link>
    </nav>
  
  
  </>
  )
}
