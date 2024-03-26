import  { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { updateProduct } from '../../api/api';

const ModalEditProduct = ({ product, open, closeModal }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [color, setColor] = useState('');
  const [deporte, setDeporte] = useState('');

  // Establecer valores iniciales del estado con los valores del producto
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
      setSize(product.size || '');
      setBrand(product.brand || '');
      setCategory(product.category || '');
      setNewProduct(product.new || '');
      setColor(product.color || '');
      setDeporte(product.deporte || '');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Parse price to float before submitting
    const parsedPrice = parseFloat(price);
  
    try {
      const updatedProductData = {
        name,
        description,
        price: parsedPrice, // Use parsedPrice instead of price
        size,
        brand,
        category,
        new: newProduct,
        color,
        deporte
      };
  
      const response = await updateProduct(product.id, updatedProductData);
  
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
    <div className={`modal ${open ? 'open' : 'closed'}  bg-green-200 `}>
      <div className="modal-content">
        <span className="close " onClick={closeModal}>&times;</span>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-80">
          <label className="mb-4" htmlFor="name">Nombre</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          
          <label className="mt-4 mb-4" htmlFor="description">Descripción</label>
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          
          <label className="mt-4 mb-4" htmlFor="price">Precio</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          
          <label className="mt-4 mb-4" htmlFor="size">Tamaño</label>
          <input type="number" id="size" value={size} onChange={(e) => setSize(e.target.value)} />
          
          <label className="mt-4 mb-4" htmlFor="brand">Marca</label>
          <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          
          <label className="mt-4 mb-4" htmlFor="category">Categoria</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          
          <label className="mt-4 mb-4" htmlFor="new">Nuevo</label>
          <input type="number" id="new" value={newProduct} onChange={(e) => setNewProduct(e.target.value)} />
          
          <label className="mt-4 mb-4" htmlFor="color">Color</label>
          <input type="text" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
          
          <label className="mt-4 mb-4" htmlFor="deporte">Deporte</label>
          <input type="text" id="deporte" value={deporte} onChange={(e) => setDeporte(e.target.value)} />
          
          <button className="bg-gray-300 mt-4 mb-4 p-2" type="submit">Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditProduct;
