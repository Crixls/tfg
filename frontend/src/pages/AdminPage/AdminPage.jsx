import {  useState } from "react";

import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const navigate= useNavigate();

    const handleProduct=()=>{
        navigate("products")
    }

    const handleUsuarios=()=>{
        navigate("users")
    }

    const handleReturn = ()=>{
        navigate("../")
    }
   

    return (
        <div className="h-1/2" style={{ backgroundImage: 'url(/src/assets/tex2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
           <div className="flex justify-center items-center m-20" >
                <button className="mr-40 bg-gray-500 border rounded-md text-white p-4 font-medium" onClick={handleProduct}>Productos</button>
                <button className="ml-40 bg-gray-500 border rounded-md p-4 text-white font-medium" onClick={handleUsuarios}>Usuarios</button>
           </div>
           <div className="m-40 flex justify-center items-center ">
                <button className="rounded-md border-none bg-black p-2 font-medium text-white text-lg w-40" onClick={handleReturn}>
                    Volver inicio
                </button>
            </div>
        </div>
    )
}

export default AdminPage;
