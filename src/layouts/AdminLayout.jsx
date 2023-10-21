import { createRef } from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Alerta from "../components/Alerta";

export default function AdminLayout() {

    const pinRef = createRef()
    let pin = sessionStorage.getItem("pin")

    const [autenticado, setAutenticado] = useState(false)
    const [mensaje, setMensaje] = useState()
    

    useEffect(() => {
        if(pin === "1656")
            setAutenticado(true)
    
    }, [])
    

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        sessionStorage.setItem("pin", pinRef.current.value)

        pin = sessionStorage.getItem("pin")
        
        if(pin === "1656")
            setAutenticado(true)
        else
            setMensaje('PIN Incorrecto')

            console.log(autenticado)
    }

    return (
        <>
            <nav className="bg-azul-bimbo p-3">
                <div className="flex items-center max-w-[90%] md:w-3/4">
                    <img 
                        src="../img/logo.svg" 
                        alt="Logo Bimbo"
                        className="max-w-xs w-32 m-0" 
                    />
                    <h1 className="ml-3 text-xl md:text-3xl text-white">CV BIMBO Xalostoc | Departamento de Vehículos</h1>
                </div>
            </nav>

            <main className='flex justify-center h-screen bg-gray-100 font-montserrat py-10'>
                <div className="w-[95%]">
                <h2 className="font-semibold text-2xl mb-3 text-center">Bienvenido, mecánico</h2>

                    {
                        autenticado ? 
                        <Outlet />
                        :
                        <form 
                            className="xl:w-1/3 mx-auto mt-10"
                            onSubmit={handleSubmitLogin}
                        >
                            <h2 className="text-xl">Por favor, ingresa el PIN de 4 dígitos para ingresar al panel</h2>
                            
                            { 
                                mensaje && <Alerta>{mensaje}</Alerta>
                            }

                            <div className="relative mt-4">
                                <input 
                                    type="pin" 
                                    id="pin" 
                                    className="block rounded-t-lg px-2.5 pb-2 pt-6 w-full text-lg font-bold bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder="" 
                                    name="km"
                                    ref={pinRef}
                                />

                                <label 
                                    htmlFor="pin" 
                                    className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                    PIN
                                </label>
                            </div>

                            <button className="mx-auto block mt-4 hover:cursor-pointer bg-azul-bimbo px-4 py-3 text-white rounded-lg font-semibold">
                                Aceptar
                            </button>
                        </form>
                    }
                </div>
            </main>

        </>
    )

}
