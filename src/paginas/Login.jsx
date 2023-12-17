import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alerta } from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'


export const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [alerta,setAlerta] = useState({});
    const navigate = useNavigate();
    const {setAuth,auth,cargando} = useAuth();
  
    const handleSubmit= async(e)=>{
        e.preventDefault();

        if([email,password].includes('')){
            setAlerta({
                msg:"Todos los campos son obligatorios",
                error:true
            })
            return
        }

        try{
            const {data} = await clienteAxios.post('/usuarios/login',{email,password});
            localStorage.setItem('token',data.token);
            
           
            setAuth(data);
            console.log(data)
            setAlerta({});
         
            navigate('/proyectos')
            
        }catch(error){
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
            console.error("Error al iniciar sesión:", error);
           
        }
    }

    const {msg} =alerta;

  return (
   <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Inicia sesión y administra tus
        <span className='text-slate-700'> proyectos</span>
     </h1>

     {msg && <Alerta alerta={alerta}/>}


    <form className='my-10 bg-white shadow rounded-lg px-10 py-10' onSubmit={handleSubmit}>
        <div className='my-5 '>
            <label className='uppercase text-gray-500 text-xl block font-bold' htmlFor='email'>Email</label>
            <input type='email'
                   placeholder='Email de registro'
                   className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                   id='email'
                   value={email}
                   onChange={e=>setEmail(e.target.value)}>
                    
            </input>
        </div>

        <div className='my-5 '>
            <label className='uppercase text-gray-500 text-xl block font-bold' htmlFor='password'>Password</label>
            <input type='text'
                   placeholder='Password de registro'
                   className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                   id='password'
                   value={password}
                   onChange={e=>setPassword(e.target.value)}>
                    
            </input>
        </div>

        <input type='submit' className='py-3 text-white uppercase font-bold bg-sky-600 rounded w-full hover:cursor-pointer hover:bg-sky-700 transition-colors mb-5' value='Iniciar sesión'/>

    </form>

    <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/registrar'>¿No tienes una cuenta? <span className='text-sky-500 hover:text-sky-700'>Regístrate</span></Link>
        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/olvide-password'>Olvide mi <span className='text-sky-500 hover:text-sky-700'>Password</span> </Link>
    </nav>

   </>
  )
}
