import React, { useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyectos';
import { Alerta } from '../components/Alerta';
import { useParams } from 'react-router-dom';

export const FormularioProyecto = () => {


    const [id,setId] = useState(null);
    const [nombre,setNombre] = useState('');
    const [descripcion,setDescripcion] = useState ('');
    const [fechaEntrega,setFechaentrega] = useState ('');
    const [cliente,setCliente] = useState ('');

    const {mostrarAlerta,alerta,submitProyecto,proyecto} = useProyectos();
    const params = useParams();


    useEffect(()=>{
        if(params.id && proyecto.nombre){
            setId(proyecto._id);
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion);
            setFechaentrega(proyecto.fechaEntrega.split('T')[0]);
            setCliente(proyecto.cliente);

        }
    },[])

    const handleSubmit = async(e)  => {
        e.preventDefault();
        if([nombre,descripcion,fechaEntrega,cliente].includes('')){
            mostrarAlerta({
                msg:'Todos los campos son obligatorios',
                error:true
            })
        }


        //Datos al provider 
        await submitProyecto({id,nombre,descripcion,fechaEntrega,cliente});
        setId(null);
        setNombre('');
        setDescripcion('');
        setFechaentrega('');
        setCliente('');
    }

    const {msg} = alerta;
  return (

    
    <form className='bg-white py-10 px-5 md:w-1/2 rounded shadow' onSubmit={handleSubmit}>

        {msg && <Alerta alerta={alerta}/>}

        <div className='mb-5'>
            <label className='uppercase text-gray-700 font-bold text-sm' htmlFor='nombre'>
                Nombre Proyecto
            </label>
            <input type="text" className='border-2 w-full placeholder-gray-400 rounded-md p-2 mt-2' id='nombre' placeholder='Nombre del proyecto'
            value={nombre}
            onChange={e=>setNombre(e.target.value)}/>
        </div>

        <div>
            <label className='uppercase text-gray-700 font-bold text-sm' htmlFor='descripcion'>
                Descripcion del proyecto
            </label>
            <textarea type="text" className='border-2 w-full placeholder-gray-400 rounded-md p-2 mt-2' id='descripcion' placeholder='Descripcion del proyecto'
            value={descripcion}
            onChange={e=>setDescripcion(e.target.value)}/>
        </div>

        <div className='mb-5'>
            <label className='uppercase text-gray-700 font-bold text-sm' htmlFor='fecha-entrega'>
                Fecha de entrega
            </label>
            <input type="date" className='border-2 w-full placeholder-gray-400 rounded-md p-2 mt-2' id='fecha-entrega' placeholder='fecha de entrega'
            value={fechaEntrega}
            onChange={e=>setFechaentrega(e.target.value)}/>
        </div>

        <div className='mb-5'>
            <label className='uppercase text-gray-700 font-bold text-sm' htmlFor='cliente'>
                Cliente
            </label>
            <input type="text" className='border-2 w-full placeholder-gray-400 rounded-md p-2 mt-2' id='cliente' placeholder='Nombre del cliente'
            value={cliente}
            onChange={e=>setCliente(e.target.value)}/>
        </div>
        
        <input type='submit' className='w-full bg-sky-500 font-bold p-3 uppercase text-white rounded cursor-pointer hover:bg-sky-600 transition-colors' value={id ? 'Actualizar Proyecto': 'Proyecto Nuevo'} />
    </form>
  )
}
