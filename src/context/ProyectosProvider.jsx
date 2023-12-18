import { createContext, useEffect, useLayoutEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

    const [proyectos,setProyectos] = useState([]);
    const [alerta,setAlerta] = useState([]);
    const [proyecto,setProyecto] = useState({});
    const [cargando,setCargando] = useState(false);
    const [ModalFormularioTarea,setModalFormularioTarea] = useState(false);
    const [tarea,setTarea] = useState('');
    const [ModalEliminarTarea ,setModalEliminarTarea] = useState(false);
    const [colaborador,setColaborador] = useState({});
    const [modalEliminarColaborador,setModalEliminarColaborador] = useState(false);
    const [buscador,setBuscador] = useState(false);
    const navigate= useNavigate();
    const {auth} = useAuth();
   


    useEffect(()=>{
        
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token');
                const config= {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                      }
                }
                const {data} = await clienteAxios('/proyectos',config);
                console.log(data)
                setProyectos(data);
                
            }catch(error){
                console.log(error)
            }
        
        }
        obtenerProyectos();
    },[auth])



    const mostrarAlerta = alerta => {
        setAlerta(alerta);
        setTimeout(() => {
            setAlerta({});
        },5000 );
    }



 
    const submitProyecto = async proyectos => {
      
        if(proyectos.id){
            await editarProyecto(proyectos);
        }
        else{
            await nuevoProyecto(proyectos);
        }
        
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        const token = localStorage.getItem('token');
        if(!token) return;
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          };

        try{
            const {data} = await clienteAxios(`/proyectos/${id}`,config);
           
            setProyecto(data);
         
        }catch(error){
            
            console.log(error);
        }
        finally{
            setCargando(false);
        }
        
    }

    const editarProyecto = async proyecto=>{
        console.log("Llega")
        console.log(proyectos)
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              };

            const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto,config);
            const proyectoActualizado = proyectos.map(proyectoState => proyectoState._id===data._id ? data : proyectoState)
            setProyectos(proyectoActualizado);
            

            setAlerta({
                msg:'Proyecto actualizado correctamente',
                error:false
            })

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 3000);
        }catch(error){
           console.log(error); 
        }

    }

    const nuevoProyecto = async proyecto=> {
        try{
           
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              };
            const {data} = await clienteAxios.post('/proyectos',proyecto,config);
            setProyectos([...proyectos,data])

            setAlerta({
                msg:'Proyecto creado correctamente',
                error:false
            })

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 3000);

        }catch(error){
            console.log(error);
        }
    }


    const eliminarProyecto = async id => {
        
        try{
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              };
            const {data} = await clienteAxios.delete(`/proyectos/${id}`,config);
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id );
            setProyectos(proyectosActualizados);
            setAlerta({
                msg:data.msg,
                error:false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos');
            }, 3000);
          

        }catch(error){
            console.log(error);
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!ModalFormularioTarea);
        setTarea({});
    }


    const submitTarea = async (tarea)=> {
        
        if(tarea?.id){
            editarTarea(tarea);
        }
        else{
            crearTarea(tarea);
        }
        
     
    }

    const handleModalEditarTarea = async (tarea) =>{

        setTarea(tarea);
        setModalFormularioTarea(true);

    }

    const editarTarea = async (tarea) =>{ 
        try{
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              };
            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`,tarea,config);
            console.log(data)
            console.log({...proyecto})
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id? data:tareaState);
            setProyecto(proyectoActualizado)
            setAlerta({
                msg:'Tarea Editada correctamente',
                error:false
            });
            setTimeout(() => { 
                setAlerta({});
                handleModalTarea(false);
                
            }, 3000);

        }catch(error){
            console.log(error);
        }

        
    }

    const crearTarea = async (tarea) => {   
        try{
            const token = localStorage.getItem('token');
                if(!token) return;
                const config = {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`
                    }
                  };
                const {data} = await clienteAxios.post(`/tareas`,tarea,config);

                //sincronizar state
                const proyectoActualizado = {...proyecto};
                proyectoActualizado.tareas = [...proyecto.tareas,data];
                setProyecto(proyectoActualizado);
                setAlerta({
                    msg:'Tarea agregada correctamente'
                })
                setTimeout(() => { 
                    setAlerta({});
                    handleModalTarea(false);
                    
                }, 3000);

               
          }catch(error){    
            console.log(error)
          }

    }

    const handleModalEliminarTarea = async tarea => {
        setTarea(tarea);
        setModalEliminarTarea(!ModalEliminarTarea);
    }


    const eliminarTarea = async () => {
     
        try{
            const token = localStorage.getItem('token');
                if(!token) return;
                const config = {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`
                    }
                  };
                const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`,config);
                const proyectoActualizado = {...proyecto}
                proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id);
                setProyecto(proyectoActualizado)
                setAlerta({
                    msg:data.msg,
                    error:true
                })
                setModalEliminarTarea(false);

                setTimeout(() => {
                    setAlerta({})
                }, 3000);

        }catch(error){
            console.log(error)
        }
       
    }

    const submitColaborador = async(email) => {
        setCargando(true)
        try{
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              };
            const {data} = await clienteAxios.post(`/proyectos/colaboradores`,{email},config);
            setAlerta({
                msg:data.msg,
                error:true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2000);
            setColaborador(data);
            
        }catch(error){
            setAlerta({
                msg:error.response,
                error:true
            })
        }
        finally{
            setCargando(false)
    }
    }

    const agregarColaborador = async (email) =>{
       
        try{
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              };
            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`,{email},config);

            setAlerta({
                msg:data.msg,
                error:false
            })
            setTimeout(() => {
                setAlerta({})
            }, 2000);
            setColaborador({})

        }
        catch(error){
            console.log(error)
           
        }
       
    }

    const handleModalEliminarColaborador = (colaborador) => {
        setColaborador(colaborador);
        setModalEliminarColaborador(!modalEliminarColaborador);
    }

    const eliminarColaborador = async() => {
       
        try{
             const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              };

            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaboradores/${proyecto._id}`,{id:colaborador._id},config);
            const proyectoActualizado = {...proyecto}
       
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id);
            setProyecto(proyectoActualizado);

            setAlerta({
                msg:data.msg,
                error:true
            })

          

            setTimeout(() => {
                setAlerta({})
                setModalEliminarColaborador(false)
                
            }, 3000);

        }catch(error){
            console.log(error)
        }
    }

    const completarTarea = async id => {

        try{
             const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              };
            const {data} = await clienteAxios.post(`/tareas/estado/${id}`,{},config);
           
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id=== data._id ? data :tareaState )
            setProyecto(proyectoActualizado);
            
            
        }catch(error){
            console.log(error)
        }
    }

    const handleBuscador =() =>{
        setBuscador(!buscador)
    }

   const cerrarSesionProyectos = ()=>{
    setProyecto({})
    setProyectos({})
    setAlerta({})

   }
    return(
        <ProyectosContext.Provider value={{
            proyectos,
            mostrarAlerta,
            alerta,
            submitProyecto,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto,
            ModalFormularioTarea,
            handleModalTarea,
            submitTarea,
            handleModalEditarTarea,
            tarea,
            ModalEliminarTarea,
            handleModalEliminarTarea,
            eliminarTarea,
            submitColaborador,
            colaborador,
            agregarColaborador,
            handleModalEliminarColaborador,
            modalEliminarColaborador,
            eliminarColaborador,
            completarTarea,
            handleBuscador,
            buscador,
            cerrarSesionProyectos,
            
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext;