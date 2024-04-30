import  { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { updateProduct } from '../../api/api';

const ModalEditProduct = ({ product, open, closeModal, onProductUpdated  }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(null); // Inicializando con null
  // const [imageFile, setImageFile] = useState(null);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [deporte, setDeporte] = useState([]);

  // Establecer valores iniciales del estado con los valores del producto
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
      setSize(product.size || []);
      setBrand(product.brand || '');
      setCategory(product.category || '');
      setNewProduct(product.new || '');
      setColor(product.color || []);
      setDeporte(product.deporte || []);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const parsedPrice = parseFloat(price);
    console.log(parsedPrice); // Log the parsed price to check its type

  
    try {
      const updatedProductData = {
        name,
        description,
        price:parsedPrice, // Use parsedPrice instead of price
        size,
        brand,
        category,
        new: newProduct,
        color,
        deporte,
        // imageFile
      };

      console.log(updatedProductData);

      const idProduct = parseInt(product.id, 10);
  
      const response = await updateProduct(idProduct, updatedProductData);
  
      onProductUpdated(response); // Llama a la función onProductCreated con el nuevo producto
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado correctamente!',
          text: `El producto ${name} ha sido actualizado exitosamente.`,
        });

      } else {
        console.error("Error en la respuesta");
      }
    } catch (error) {
      console.error("Error en la actualización del producto:", error);
    } finally {
      closeModal();
    }
  };



  return (
    <div className={`modal ${open ? 'open' : 'closed'} fixed inset-0 z-50 flex justify-center items-center`} style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
      <div className="cursor-pointer absolute top-4 right-4" onClick={closeModal}>
        <ion-icon style={{color:"white"}} size="large" name="close"></ion-icon>
      </div>       
      <div className={`modal ${open ? 'open' : 'closed'}  bg-gray-500 rounded-md`}>
        <div className="modal-content">
          <form onSubmit={handleSubmit} className=" w-80">
            <div className=" justify-start p-8 pl-12 pr-12 flex flex-col">
              <label className=" font-bold m-2 text-white" htmlFor="name">Nombre</label>
              <input className="m-2 rounded-md " type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              
              <label className=" font-bold m-2 text-white" htmlFor="description">Descripción</label>
              <input className="m-2 rounded-md" type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              
              <label className="m-2 font-bold text-white" htmlFor="price">Precio</label>
              <input className="m-2 rounded-md" type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
              
              <label className=" font-bold m-2 text-white" htmlFor="size">Tamaño (separados por comas)</label>
              <input className="m-2 rounded-md"
                type="text"
                id="size"
                value={size.join(',')}
                onChange={(e) => setSize(e.target.value.split(','))}
              />

              <label className=" font-bold m-2 text-white" htmlFor="brand">Marca</label>
              <input className="m-2 rounded-md" type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
              
              <label className=" font-bold m-2 text-white" htmlFor="category">Categoria</label>
              <input className="m-2 rounded-md" type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
              
              <label className=" font-bold m-2 text-white" htmlFor="new">Nuevo</label>
              <input className="m-2 rounded-md" type="number" id="new" value={newProduct} onChange={(e) => setNewProduct(e.target.value)} />
              
              <label className=" font-bold m-2 text-white" htmlFor="color ">Color (separados por comas)</label>
              <input className="m-2 rounded-md"
                type="text"
                id="color"
                value={color.join(',')}
                onChange={(e) => setColor(e.target.value.split(','))}
              />
              <label className=" font-bold m-2 text-white" htmlFor="deporte">Deporte (separados por comas)</label>
              <input className="m-2 rounded-md"
                type="text"
                id="deporte"
                value={deporte.join(',')}
                onChange={(e) => setDeporte(e.target.value.split(','))}
              />

            </div>
            <div className="flex justify-center">
              <button type="submit" className='p-2 m-4 pl-20 pr-20 bg-white font-medium rounded-md mt-6'>Actualizar</button>
            </div>
          </form>
        </div>
      </div>
      </div>
  );
};

export default ModalEditProduct;