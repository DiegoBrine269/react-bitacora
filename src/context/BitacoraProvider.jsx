import { createContext, useEffect, useState } from "react"
import clienteAxios from "../config/axios"

const BitacoraContext = createContext()

const BitacoraProvider = ({children}) => {

    const [opcion, setOpcion] = useState(1)
    const [piezas, setPiezas] = useState([])
    const [piezasActual, setPiezasActual] = useState({})
    const prefijoFolio = '4015'
    const [solicitud, setSolicitud] = useState({})
    const [modal, setModal] = useState(false)

    const modalStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      };

    // Click en opción para la categoría de falla
    const handleClickOpcion = opcion => {
        setOpcion(opcion)
    }
    
    // Piezas = fallas en DB
    const obtenerPiezas = async () =>{
        try {
            const {data} = await clienteAxios('/api/fallas')
            setPiezas(data.data.filter(falla => falla.categoria == opcion))
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        obtenerPiezas();
        console.log('opción cambió')
    }, [opcion])

    const handleSubmitNuevaSolicitud = async () => {
        try {
            await clienteAxios.post('/api/solicitudes', {

            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSetSolicitud = (s) =>  {
        setSolicitud(s)
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    return (
        <BitacoraContext.Provider
            value = {{
                opcion,
                handleClickOpcion,
                piezas,
                handleSubmitNuevaSolicitud,
                prefijoFolio,
                solicitud,
                handleSetSolicitud,
                modal,
                handleClickModal,
                modalStyles
                
            }} 
        >
            {children}
        </BitacoraContext.Provider>
    )
}

export {
    BitacoraProvider
}

export default BitacoraContext
