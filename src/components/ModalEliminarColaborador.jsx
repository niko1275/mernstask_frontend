import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import { Alerta } from './Alerta';

export default function ModalEliminarColaborador() {
  const {handleModalEliminarColaborador,modalEliminarColaborador,alerta,eliminarColaborador} = useProyectos();
  
  const {msg} = alerta;
  return (
    <>

      <Transition appear show={modalEliminarColaborador} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleModalEliminarColaborador}>
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
                    {msg && <Alerta alerta={alerta}/>}
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex justify-start font-medium leading-6 text-gray-900 text-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>

                    Eliminar Colaborador
                  </Dialog.Title>
                  <div className="mx-6 text-gray-500">
                        <p>Una vez eliminado, esta persona no podrá acceder al proyecto</p>
                    </div>

                  <div className="flex justify-end gap-2 mt-5">
                    <button
                      onClick={handleModalEliminarColaborador}
                      type="button"
                      className="inline-flex justify-center rounded-md border  bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >   
                      cancelar
                    </button>

                    <button
                      onClick={()=>eliminarColaborador()}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Eliminar
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
