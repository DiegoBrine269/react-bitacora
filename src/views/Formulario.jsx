import useBitacora from "../hooks/useBitacora"
import { createRef,  useState } from "react"
import clienteAxios from "../config/axios"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


export default function Formulario() {

    const { piezas,} = useBitacora()
    const navigate = useNavigate()

    const ecoRef = createRef()
    const kmRef = createRef()
    const personaRef = createRef()
    const fallas_idRef = createRef()
    const descripcionRef = createRef()
    const [errores, setErrores] = useState([])


    const handleSumbit = async e => {
        e.preventDefault()
        
        const datos = {
            eco: ecoRef.current.value,
            km: kmRef.current.value,
            persona: personaRef.current.value,
            fallas_id: fallas_idRef.current.value,
            descripcion: descripcionRef.current.value,
        }



        try {
            const {data} = await clienteAxios.post('/api/solicitudes', datos)

            Swal.fire({
                title: 'Solicitud realizada exitosamente',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            }).then(function() {
                navigate('/')
            })


        } catch (error) {
            console.log(error)
            console.log(error.response.data.errors)
            setErrores(Object.values(error?.response?.data?.errors))
        }


        // handleSubmitNuevaSolicitud()
    }

    return (
        <>

            <h2 className="font-semibold text-2xl mb-3 text-center">Solicitud de trabajo</h2>

            <div className="mx-auto w-full xl:w-2/3">
                <p className="text-lg">Por favor, ingrese los siguientes datos</p>
            </div>


            <div className="mx-auto w-full xl:w-2/3 mt-10">
                <form 
                    action="" 
                    className=""
                    onSubmit={handleSumbit}
                    noValidate
                >

                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

                    <div className="relative">
                        <input 
                            type="number" 
                            id="vehiculo" 
                            className="block rounded-t-lg px-2.5 pb-2 pt-6 w-full text-lg font-bold bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" "
                            name="eco" 
                            ref={ecoRef}
                        />

                        <label 
                            htmlFor="vehiculo" 
                            className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                            Vehículo
                        </label>
                    </div>

                    <div className="relative">
                        <input 
                            type="number" 
                            id="kilometraje" 
                            className="block rounded-t-lg px-2.5 pb-2 pt-6 w-full text-lg font-bold bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            name="km"
                            ref={kmRef}
                        />

                        <label 
                            htmlFor="kilometraje" 
                            className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                            Kilometraje
                        </label>
                    </div>

                    <div className="relative">
                        <input 
                            type="text" 
                            id="persona" 
                            className="block rounded-t-lg px-2.5 pb-2 pt-6 w-full text-lg font-bold bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            name="persona"
                            ref={personaRef}
                        />

                        <label 
                            htmlFor="persona" 
                            className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                            Persona que reporta
                        </label>
                    </div>

                    <div className="relative">
                        <select  
                            id="falla" 
                            className="block rounded-t-lg px-2.5 pb-2 pt-6 w-full text-lg font-bold bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            defaultValue={""}
                            name="fallas_id"
                            ref={fallas_idRef}
                        >
                            <option value="" disabled> -- Seleccione una opción -- </option>
                            {
                                piezas.map(pieza => (
                                    <option key={pieza.nombre} value={pieza.id}>{pieza.nombre}</option>
                                ))
                            }
                        </select>


                        <label 
                            htmlFor="falla" 
                            className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                            Falla que presenta el vehículo
                        </label>
                    </div>

                    <div className="relative">
                        <textarea
                            id="descripcion" 
                            className="resize-none block rounded-t-lg px-2.5 pb-2 pt-6 w-full text-lg font-bold bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            rows="5"
                            name="descripcion"
                            ref={descripcionRef}
                            maxLength="255"
                        >

                        </textarea>

                        <label 
                            htmlFor="descripcion" 
                            className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                            Descripción del reporte
                        </label>
                    </div>

                    <div className="flex justify-between align-middle mt-6">

                        <Link 
                            to="/solicitud"
                            className="text-indigo-900 text-xl underline"
                        >
                            Volver atrás
                        </Link>

                        <input 
                            type="submit"
                            value="Solicitar trabajo"
                            className="hover:cursor-pointer bg-azul-bimbo px-4 py-3 text-white rounded-lg font-semibold"
                        />

                    </div>
                </form>
            </div>



        </>
    )
}
