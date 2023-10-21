import clienteAxios from "../config/axios"
import useBitacora from "../hooks/useBitacora"
import { useState, createRef } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import Tabla from "../components/Tabla"
import Modal from "react-modal"
import { useEffect } from "react"


export default function Calificacion() {

    const [eco, setEco] = useState()
    const [rating, setRating] = useState(0)
    const [mensaje, setMensaje] = useState('')
    const [solicitudes, setSolicitudes] = useState([])


    const ecoRef = createRef()
    const calificacionRef = createRef()
    const comentariosRef = createRef()
    
    const { prefijoFolio, modal, handleClickModal, solicitud, handleSetSolicitud, modalStyles } = useBitacora()

    const handleClickRating = rating => {
        setRating(rating)
    }

    const handleChangeEco = () => {
        setEco(eco)
    }

    const handleBuscarSubmit = async e => {
        e.preventDefault()
        const { data } = await clienteAxios.get(`/api/solicitudes/eco/${ecoRef.current.value}`)
        setSolicitudes(data)
        if(solicitudes)
            setMensaje('No ha sido posible encontrar una solicitud con ese número o aún no ha sido atendida')
    }

    const handleCalificarSubmit = async e => {
        e.preventDefault()

        try {
            const {respuesta} = await clienteAxios.put(`/api/solicitudes/${solicitud.id}`, {
                calificacion : calificacionRef.current.value,
                comentarios: comentariosRef.current.value
            })
            handleClickModal()
            setSolicitudes([])
            setMensaje('')
            ecoRef.current.value = ''
            ecoRef.current.focus()
            
        } catch(error) {
            console.log(error)
        }
    }



    const columns = [
        {
            name: 'Fecha',
            selector: row => row.fecha,
            sortable: true,
        },
        {
            name: 'Vehículo',
            selector: row => row.eco,
            sortable: true,

        },
        {
            name: 'Persona que reporta',
            selector: row => row.persona,
            sortable: true,

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
            name: 'Acciones',
            selector: row => row.action,
            cell: row => (
                <div className=" w-full flex justify-evenly">
                    <button 
                        aria-label="Name"
                        className="text-azul-bimbo text-xl"
                        onClick={() => { 
                            handleSetSolicitud(row)
                            handleClickModal() 
                        }}
                        title="Calificar trabajo"
                    > 
                        Calificar trabajo
                    </button>
                    

                </div>
            ),
        },

    ];

    return (
        <>
            <h2 className="font-semibold text-2xl text-center">Calificar trabajo</h2>

            <div className="mx-auto w-full mt-5 flex justify-center">
                <p className="text-lg">Por favor, ingrese el número de económico de su vehículo</p>
            </div>
            
            <div className="mx-auto w-full mt-5 mb-5 flex justify-center">
                <form 
                    className="flex items-center"
                    onSubmit={handleBuscarSubmit}
                >
                    <div className="relative">
                        <input 
                            type="number" 
                            id="eco" 
                            className="block rounded-t-lg px-2.5 pb-1 pt-6 text-lg font-bold bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder="" 
                            ref={ecoRef}
                            autoFocus
                            required
                            onChange={handleChangeEco}
                        />

                        <label 
                            htmlFor="eco" 
                            className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                            Económico
                        </label>
                    </div>

                    <input 
                        type="submit" 
                        value="Buscar" 
                        className="w-28 h-12 ml-3 inline-block hover:cursor-pointer bg-azul-bimbo px-4 py-3 text-white rounded-lg font-semibold"
                    />
                </form>
            </div>

            {
                solicitudes.length === 0 ? <p>{mensaje}</p> :
                <Tabla
                    columns={columns}
                    data={solicitudes}
                />
            }

            <div className="mt-4">
                <Link 
                    to="/"
                    className="text-indigo-900 text-xl underline"
                >
                    Volver atrás
                </Link>
            </div>

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

                        <form 
                            className="px-6 flex flex-col items-center font-montserrat"
                            onSubmit={handleCalificarSubmit}
                        >
                            <p className="text-xl mb-3">Ingresa una calificación para el trabajo realizado</p>
                            <Rating
                                onClick={handleClickRating}
                                allowFraction={true}
                            />
                            <p>{rating} / 5</p>


                            <input 
                                type="hidden" 
                                name="calificacion" 
                                value={rating} 
                                required
                                ref={calificacionRef}
                            />

                            <div className="relative mt-4 w-full">
                                <textarea
                                    id="comentarios" 
                                    className="resize-none block rounded-t-lg px-2.5 pb-2 pt-6 w-full text-lg font-bold bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    rows="5"
                                    name="comentarios"
                                    ref={comentariosRef}
                                    maxLength="255"
                                >
                                    
                                </textarea>

                                <label 
                                    htmlFor="comentarios" 
                                    className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                    Comentarios (opcionales)
                                </label>
                            </div>

                            <input 
                                type="submit" 
                                value="Enviar calificación" 
                                className="mt-4 hover:cursor-pointer bg-azul-bimbo px-4 py-3 text-white rounded-lg font-semibold"
                            />
                        </form>
                    </Modal>
                )
            }

        </> 
    )
}
