import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alerta } from '../components/Alerta';
import axios from 'axios';
import clienteAxios from '../config/clienteAxios';

export const Registrar = () => {
    const [nombre,setNombre] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [repetirPassword,setRepetirPassword] = useState('');
    const [alerta,setAlerta] = useState({})


    const handleSubmit= async (e)=>{
        e.preventDefault();
       
        if([nombre,email,password,repetirPassword].includes('')){
            setAlerta({
                msg:'Todos los campos son obligatorios',
                error:true
            })
            return
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: 'Los password No son iguales',
                error: true
            });
            return;
        }

        if(password.length < 6 ){
            setAlerta({
                msg:'El password es muy corto',
                error:true
            })
            return
        }

        setAlerta({})

        try{
            const respuesta = await clienteAxios.post(`/usuarios`,{nombre,email,password});
            const {data} = respuesta;
            setAlerta({
                msg:data.msg,
                error:false
            })
            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');
        }catch(error){
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
        }
        
    }

    const {msg} = alerta;
    console.log("aler valor"+alerta.msg);
   
  

  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Crea tu cuenta y administra tus
        <span className='text-slate-700'> proyectos</span>
     </h1>

     {msg && <Alerta alerta={alerta} />}

    <form onSubmit={(e) => handleSubmit(e)} className='my-10 bg-white shadow rounded-lg px-10 py-10'>

        <div className='my-5 '>
            <label className='uppercase text-gray-500 text-xl block font-bold' htmlFor='nombre'>Nombre</label>
            <input type='text'
                   placeholder='Tu Nombre'
                   className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                   id='nombre'
                   value={nombre}
                   onChange={(e) => {
                    setNombre(e.target.value);
                    console.log(e.target.value); // Imprimirá el valor de nombre en la consola
                }}
                   >
                    
            </input>
        </div>
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
            <input type='password'
                   placeholder='Password de registro'
                   className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                   id='password'
                   value={password}
                   onChange={e=>{setPassword(e.target.value); console.log(e.target.value);  }}>
                    
            </input>
        </div>

        <div className='my-5 '>
            <label className='uppercase text-gray-500 text-xl block font-bold' htmlFor='repetir-password'>Repetir Password</label>
            <input type='password'
                   placeholder='Repetir tu password'
                   className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                   id='repetir-password'
                   value={repetirPassword}
                   onChange={e=>{setRepetirPassword(e.target.value); console.log(e.target.value);}}>
                    
            </input>
        </div>

        <input type='submit' className='py-3 text-white uppercase font-bold bg-sky-600 rounded w-full hover:cursor-pointer hover:bg-sky-700 transition-colors mb-5' value='Crear Cuenta'/>

    </form>

    <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/'>¿Ya tienes una cuenta? <span className='text-sky-500 hover:text-sky-700'>Inicia Sesión</span></Link>
        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/olvide-password'>Olvide mi <span className='text-sky-500 hover:text-sky-700'>Password</span> </Link>
    </nav>

   </>
  )
}
