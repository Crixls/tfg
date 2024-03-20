import { useEffect, useState } from "react";
import {  getProductsTodos } from "../../api/useCases";
import CardShoes from "../../components/CardShoes";
import ModalNewProduct from "../../components/ModalNewProduct";
import ModalEditProduct from "../../components/Product/ModalEditProduct";

const AdminPage = () => {
    const [allShoes, setAllShoes] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);


    useEffect(() => {
        const fetchApi = async () => {
        try {
            const data = await getProductsTodos();
            setAllShoes(data);
            console.log("Productos:", data);
        } catch (error) {
            console.log("Error:", error);
        }
        };
        fetchApi();
    }, []);
  
  const handleCrearProducto=()=>{
    setOpen(true);
  }
  const handleEditarProducto=()=>{
    setOpen2(true);
  }
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleCloseModal2 = () => {
    setOpen2(false);
  };

 
    

  return (
    <>
      <h1>Productos</h1>
      <div className="flex justify-center">
        <button onClick={handleCrearProducto} className="bg-red-200 p-2 m-2">Crear producto</button>
      </div>
      <div className="flex justify-center">
        {open && <ModalNewProduct open={open} closeModal={handleCloseModal}/>}
      </div>
      <div className="flex justify-center">
        {open2 && <ModalEditProduct open={open2} closeModal={handleCloseModal2}/>}
      </div>
      
      <div className="grid grid-cols-3 gap-4 ">
        
        {allShoes.map((manShoe, index) => (
          <div key={index} className="flex justify-center flex-col items-center">
            <CardShoes typeShoe={manShoe} />
            <button className="bg-green-200 p-2 m-2" onClick={handleEditarProducto}>Editar producto</button>
            <button className="bg-purple-200 p-2 m-2">Eliminar producto</button>
          </div>
        ))}
      </div>

     
 

      

    </>
  )
}

export default AdminPage
