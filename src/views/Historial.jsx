import useSWR  from "swr"
import clienteAxios from "../config/axios"
import { Rating } from 'react-simple-star-rating'
import { useState, useEffect, createRef } from "react"
import Modal from "react-modal"
import Info from "../components/solicitudes/Info"
import useBitacora from "../hooks/useBitacora"
import Swal from "sweetalert2"
import Tabla from "../components/Tabla"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheck } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement('#root')


export default function Historial() {

    const ecoRef = createRef()

    // const [solicitudes, setSolicitudes] = useState([])
    
    // Consulta useSWR
    const fetcher = () => clienteAxios('/api/solicitudes', ).then(data =>  data.data)
    
    // Prefijo único de cada agencia
    const { prefijoFolio, modal, handleClickModal, solicitud, handleSetSolicitud, modalStyles,  } = useBitacora()

    const handleClickMarcar = s => {
        Swal.fire({
            title: "Ingresa tu nombre",
            text: "Para marcar como completado, por favor ingresa tu nombre:",
            input: 'text',
            cancelButtonText: 'Cancelar',
            showCancelButton: true      ,
            inputAttributes: {
                required: 'true',
            },
            inputValidator: (value) => {
                if (value === '') {
                    return 'Por favor, ingresa tu nombre'
                }
            },
        }).then( async result => {
            // Se ingresó un nombre
            if (result.value) {
                try {
                    console.log(s.id)
                    await clienteAxios.put(`/api/solicitudes/${s.id}`, {
                        mecanico : result.value 
                    })
                } catch(error) {
                    console.log(error)
                }
            }
        });
    }


    const { data, error, isLoading } = useSWR('api/solicitudes', fetcher, {
        refreshInterval : 1000
    })



    // setSolicitudes(data.data)

    const columns = [
        {
            name: 'Fecha',
            selector: row => row.fecha,
            sortable: true,
            width:"8%"
        },
        {
            name: 'Vehículo',
            selector: row => row.eco,
            sortable: true,
            width:"10%"
        },
        {
            name: 'Kilometraje',
            selector: row => row.km,
            sortable: true,
        },
        {
            name: 'Persona que reporta',
            selector: row => row.persona,
            sortable: true,
            width:"15%"
        },
        {
            name: 'Falla presentada',
            selector: row => row.falla,
            sortable: true,
        },
        {
            name: 'OT GB Fleet',
            selector: row => row.id,
            sortable: true,
            cell: row => (
                `${prefijoFolio}-${row.id}` 
            ),
            wrap: false,
        },
        {
            name: 'Mecánico asignado',
            selector: row => row.mecanico,
            sortable: true,
            cell: row => (
                row.mecanico ? 
                    <p>{row.mecanico}</p>
                :
                <p>No asignado</p>
            ),
            width:"15%"
        },
        {
            name: 'Calificación',
            selector: row => row.calificacion,
            sortable: true,
            cell: row => (
                row.calificacion ? 
                <Rating
                    allowFraction={true}
                    className=""
                    initialValue={ row.calificacion }
                    disable={true}
                    readonly={true}
                />	
                :
                <p>Sin calificación</p>
            ),
            width: "15%"
        },
        {
            name: 'Acciones',
            selector: row => row.action,
            cell: row => (
                <div className=" w-full flex justify-evenly">
                    <button 
                        aria-label="Name"
                        className="text-azul-bimbo text-3xl"
                        onClick={() => { 
                            handleSetSolicitud(row)
                            handleClickModal() 
                        }}
                        title="Visualizar"
                    > 
                        <FontAwesomeIcon icon={faEye} /> 
                    </button>
                    
                    {
                        row.mecanico ?  null : (

                            <button 
                                aria-label="Name" 
                                className="text-green-600 text-3xl"
                                title="Marcar como completado"
                                onClick={() => {handleClickMarcar(row)}}
                            > 
                                <FontAwesomeIcon icon={faCheck} /> 
                            </button>
                        )
                    }
                </div>
            ),
            width: "10%"
        },

    ];




    if (isLoading) return <p className="text-center">Cargando...</p>

    if (error)  return <p className="text-center"> Ha habido un error </p>


    

    // const handleChangeEco = () =>  {
    //     if(ecoRef.current !== null)
    //         // solicitudes = data.data.filter(s => s.eco == ecoRef.current.value);

    //     console.log(solicitudes)
    // }


    return (
        <>  
            {/* <div className="relative mb-3 ml-3">
                <input 
                    type="text" 
                    id="vehiculo" 
                    className="block rounded-t-lg px-2.5 pb-2 pt-6 w-full text-lg font-bold bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder="" 
                    name="vehiculo"
                    ref={ecoRef}
                    // onChange={handleChangeEco}
                />

                <label 
                    htmlFor="vehiculo" 
                    className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                    Filtrar por vehículo
                </label>
            </div> */}

            <Tabla
                columns={columns}
                data={data.data}
                title={"Solicitudes de trabajo"}
            />
            {
                modal && (
                    <Modal isOpen={modal} style={modalStyles}>
                        <div className="flex justify-end ">
                            <button
                                onClick={() => {handleClickModal()}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="px-6">
                            <Info
                                solicitud={solicitud}
                            />
                        </div>
                    </Modal>
                )
            }
        </>
    )
}
