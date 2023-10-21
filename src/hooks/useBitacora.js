import { useContext } from "react";
import BitacoraContext from "../context/BitacoraProvider";

const useBitacora = () => {
    return useContext(BitacoraContext)
}

export default useBitacora