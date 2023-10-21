import Boton from "../components/Boton"

export default function Admin() {
  return (
    <>  
        <h2 className="font-semibold text-2xl mb-3 text-center">Bienvenido, mecánico</h2>
        <p className="text-lg">Seleccione la opción deseada</p>

        <div className="mx-auto mt-20 md:w-2/3  grid grid-cols-2 justify-center align-middle gap-4">
            <Boton
                texto="Atender solicitud"
                icono="../img/Buscar.svg"
            />

            <Boton
                texto="Ver historial de trabajos"
                icono="../img/Historial.svg"
                enlace="/solicitudes"
            />
        </div>
    </>
  )
}
