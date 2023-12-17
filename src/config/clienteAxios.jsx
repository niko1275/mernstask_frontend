import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

export default clienteAxios;

// import axios from "axios";

// const clienteAxios = axios.create({
//     baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
//     withCredentials: true, // Incluye cookies en las solicitudes CORS (necesario si estás utilizando autenticación con cookies)
//     headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': 'https://mernstask-frontend.vercel.app', // Agrega el origen permitido (tu frontend URL)
//     },
// });

// export default clienteAxios;