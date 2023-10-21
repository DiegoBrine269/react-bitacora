import DataTable from 'react-data-table-component'
import { useEffect } from 'react';

export default function Tabla({columns, data, title, actionsMemo}) {

    useEffect(() => {
        console.log("Change in child detected, rendering new data");
    }, [data]);

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', 
            },
        },
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '1rem',
                display: 'flex',
                justifyContent: 'center',
                overflowWrap: 'break-word'
            },
        },
        cells: {
            style: {
                textAlign: 'center',
                fontSize: '1rem',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                display: 'flex',
                justifyContent: 'center'
            },
        },
    };

    return (
        <DataTable
            noDataComponent="No hay registros para mostrar"
            columns={columns}
            data={data}
            title={title}
            customStyles={customStyles}
            actions={actionsMemo}
            pagination
            highlightOnHover
        />
    )
}
