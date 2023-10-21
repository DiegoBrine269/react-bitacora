import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Registro from './views/Registro'
import Opcion from './views/Opcion'
import Formulario from './views/Formulario'
import Calificacion from './views/Calificacion'
import Historial from './views/Historial'


const router = createBrowserRouter([
    {
        path: '/react-bitacora/',
        element: <Layout/>, 
        children: [
            {
                index: true, 
                element: <Inicio/>
            }
        ]
    },

    // {
    //     path: '/auth',
    //     element: <AuthLayout/>,
    //     children: [
    //         {
    //             path: '/auth/login',
    //             element: <Login/>
    //         },
    //         {
    //             path: '/auth/registro',
    //             element: <Registro/>
    //         }
    //     ]
    // },

    {
        path: '/react-bitacora/solicitud',
        element: <Layout/>,

        children: [
            {
                path: '/solicitud',
                element: <Opcion/>
            },
            {
                path: '/solicitud/formulario',
                element: <Formulario/>
            },
            {
                path: '/solicitud/calificar',
                element: <Calificacion/>
            }
        ]
    },

    {
        path: '/react-bitacora/admin',
        element: <AdminLayout/>, 
        children: [
            {
                index: true, 
                element: <Historial/>
            }
        ]
    },

    // {
    //     path: '/solicitudes',
    //     element: <AdminLayout/>, 
    //     children: [
    //         {
    //             index: true, 
    //             element: <Historial/>
    //         }
    //     ]
    // }


])

export default router