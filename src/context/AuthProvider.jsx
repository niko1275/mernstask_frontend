import { useState,useEffect,createContext, Children } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ({children})=>{

    const [auth,setAuth] = useState(null);
    const [cargando,setCargando] = useState(true);
    const navigate = useNavigate();
    
    useEffect(  ()=>{
        
        const autenticarUsuario = async ()=>{
            const token = localStorage.getItem('token');
            console.log("token"+token);
            if(!token){
                console.log('entra')
                setCargando(false);
                return
            }

            const config = ({
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })

            try{
                
                const {data} = await clienteAxios('/usuarios/perfil',config);
                
                setAuth(data);
                navigate('/proyectos');
               
            
            }catch(error){
                console.log(error)
                setAuth({});
            }
            finally{
                setCargando(false)
            }
        };
      
        autenticarUsuario();
    },[]);

    const cerrarSesionAuth = () => {
        setAuth({})
    }
    

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            cargando,
            cerrarSesionAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthProvider,
    
}

export default AuthContext;