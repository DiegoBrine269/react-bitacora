import { Outlet } from "react-router-dom";

export default function Layout() {
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
            <div className="w-[90%]  md:w-3/4">
                <Outlet />
            </div>
        </main>

    </>
  )
}
