import { Link } from "react-router-dom"
import Boton from "../components/Boton"



export default function Opcion() {
  return (
    <>  

        <h2 className="font-semibold text-2xl mb-3 text-center">Solicitud de trabajo</h2>

        <div className="mx-auto w-full xl:w-2/3 mt-20">
            <p className="text-lg">Seleccione el tipo de servicio que requiere</p>
        </div>

        <div className="mx-auto mt-20 w-full xl:w-2/3 grid grid-cols-2 sm:grid-cols-3 justify-center align-middle gap-4">
            <Boton
                texto="Cabina"
                icono="../img/Volante.svg"
                enlace="/solicitud/formulario"
                opcion='1'
            />

            <Boton
                texto="Dispositivos de seguridad"
                icono="../img/Candado.svg"
                enlace="/solicitud/formulario"
                opcion='2'
            />

            <Boton
                texto="Carrocería"
                icono="../img/Carroceria.svg"
                enlace="/solicitud/formulario"
                opcion='3'
            />
        </div>

        <div className="mx-auto w-full xl:w-2/3 mt-20">
            <Link 
                to="/"
                className="text-indigo-900 text-xl underline"
            >
                Volver atrás
            </Link>
        </div>
    </>
  )
}
