import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import { Alerta } from './Alerta';
import { useParams } from 'react-router-dom';
import { formatearFecha } from '../helpers/formatearFecha';

export default function ModalFormulario() {
  const {ModalFormularioTarea,handleModalTarea,alerta,mostrarAlerta,submitTarea,tarea} = useProyectos();
  const [id,setId] = useState('');
  const [nombre,setNombre] =useState('');
  const [prioridad,setPrioridad] = useState('');
  const [descripcion,setDescripcion] = useState('');
  const [fechaEntrega,setFechaentrega] = useState('');

  const params = useParams();

 
  useEffect(()=>{
   
    if(tarea?._id){
      setId(tarea._id);
      setNombre(tarea.nombre);
      setDescripcion(tarea.descripcion);
      setPrioridad(tarea.prioridad);
      setFechaentrega(formatearFecha(tarea.fechaEntrega));
      return
    }
    setId('');
    setNombre('');
    setDescripcion('');
    setPrioridad('');
    setFechaentrega('');

  },[tarea]);

  const formatearFecha = (fecha) => {
    return fecha ? fecha.split('T')[0] : ''; 
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([nombre,prioridad,descripcion].includes('')){
      mostrarAlerta({
        msg:'Todos los campos son obligatorios',
        error:true
      })
      return
    }
    
    await submitTarea({ id,nombre,descripcion,prioridad,fechaEntrega,proyecto:params.id})
    setNombre('');
    setDescripcion('');
    setPrioridad('');
    setFechaentrega('');
  }

  const {msg} = alerta;

  return (
    <>

      <Transition appear show={ModalFormularioTarea} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleModalTarea}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Crear Tarea
                  </Dialog.Title>
                  <div className="mt-2">

                    {msg && <Alerta alerta={alerta}/>}
                    <form className='mb-5' onSubmit={handleSubmit}>
                      <label className='font-bold w-full text-sm uppercase ' htmlFor='nombre'>Nombre Tarea</label>
                      <input className='w-full border rounded-sm p-2 mb-4 mt-1' placeholder='Nombre de la tarea' id='nombre' 
                      value={nombre}
                      onChange={e=>setNombre(e.target.value)}/>

                      <label className='font-bold w-full text-sm uppercase ' htmlFor='descripcion'>Descripcion Tarea</label>
                      <textarea className='w-full border rounded-sm p-2 mb-4 mt-1' placeholder='Descripcion de la tarea' id='descripcion' value={descripcion} onChange={e=>setDescripcion(e.target.value)}/>

                      <label className='font-bold w-full text-sm uppercase ' htmlFor='fecha-entrega'>Fecha Tarea</label>
                      <input type='date' className='w-full border rounded-sm p-2 mb-4 mt-1' placeholder='Fecha de entrega' id='fecha-entrega' value={fechaEntrega} onChange={e=>setFechaentrega(e.target.value)}/>

                      <label className='font-bold w-full text-sm uppercase ' htmlFor='prioridad'>Prioridad Tarea</label>
                      <select id='prioridad' className='w-full border p-3' value={prioridad} onChange={e=>setPrioridad(e.target.value)}>
                          <option>--Seleccionar</option>
                          <option value="Baja">Baja</option>
                          <option value="Media">Media</option>
                          <option value="Alta">Alta</option>
                      </select>
                      {
                        id ?  <input type='submit' className='bg-sky-600 hover:bg-sky-700 font-bold transition-colors rounded-sm cursor-pointer w-full p-2 text-white mt-4' value='Editar Tarea'></input> :  <input type='submit' className='bg-sky-600 hover:bg-sky-700 font-bold transition-colors rounded-sm cursor-pointer w-full p-2 text-white mt-4' value='Nueva Tarea'></input>
                      }
                     
                    </form>      
              
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={handleModalTarea}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Cerrar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
