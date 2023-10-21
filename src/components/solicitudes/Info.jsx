//Componente para mostrar la información de las solicitudes
import useBitacora from "../../hooks/useBitacora"
import Linea from "./Linea"

export default function Info({solicitud}) {

    const { prefijoFolio } = useBitacora()

    return (
        <>  
            <Linea
                titulo={'Fecha'}
                dato={solicitud.fecha}
            />

            <Linea
                titulo={'Vehículo'}
                dato={solicitud.eco}
            />

            <Linea
                titulo={'Kilometraje'}
                dato={solicitud.km + ' km'}
            />

            <Linea
                titulo={'Persona que reporta'}
                dato={solicitud.persona}
            />

            <Linea
                titulo={'Falla presentada'}
                dato={solicitud.falla}
            />

            <Linea
                titulo={'Descripción del reporte'}
                dato={solicitud.descripcion ? solicitud.descripcion : 'Sin descripción'}
            />

            <Linea
                titulo={'OT GB Fleet'}
                dato={`${prefijoFolio}-${solicitud.id}`}
            />

            <Linea
                titulo={'Mecánico que repara'}
                dato={solicitud.mecanico ? solicitud.mecanico : 'Sin reparar'}
            />
        
            <Linea
                titulo={'Calificación'}
                dato={solicitud.calificacion ? solicitud.calificacion + '/5' : 'Sin calificación'}
            />

            <Linea
                titulo={'Comentarios'}
                dato={solicitud.comentarios ? solicitud.comentarios  : 'Sin comentarios'}
            />
        </>

    )
}
