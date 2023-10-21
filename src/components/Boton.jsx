import { Link } from "react-router-dom";
import useBitacora from "../hooks/useBitacora"

export default function Boton({texto, icono, enlace, opcion = 0}) {

    // Se ejecuta este event de manera genérica, aunque solo se espera tener efecto en los botones de opción
    const {handleClickOpcion} = useBitacora()

    return (
        <Link
            className="w-36 h-36 md:w-52 md:h-52 inline-block bg-white rounded-2xl m-auto"
            to={enlace}
            onClick={() => {handleClickOpcion(opcion)}}
        >
            <div className="flex flex-col justify-evenly h-full items-center">
                <img 
                    src={icono} 
                    alt="Icono"
                    className="w-[50%] h-[50%] block" 
                />

                <span className="md:text-lg text-center">{texto}</span>        

            </div>
        </Link>
  )
}
