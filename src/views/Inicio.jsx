import Boton from "../components/Boton"

export default function Inicio() {
  return (
    <>  
        <h2 className="font-semibold text-2xl mb-3 text-center">Bienvenido, vendedor</h2>

        <div className="mx-auto w-full xl:w-2/3 mt-20">
          <p className="text-lg">Seleccione la opción deseada</p>
        </div>

        <div className="mx-auto mt-20 md:w-2/3  grid grid-cols-2 justify-center align-middle gap-4">
            <Boton
                texto="Solicitar trabajo"
                icono="../img/Herramientas.svg"
                enlace="/solicitud"
            />

            <Boton
                texto="Calificar trabajo"
                icono="../img/Estrellas.svg"
                enlace="/solicitud/calificar"
            />
        </div>
    </>
  )
}
