import { useState } from "react";
import Swal from 'sweetalert2';
import { sendProductFormData } from "../api/api";

const ModalNewProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [color, setColor] = useState('');
  const [deporte, setDeporte] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name || !description || !price || !imageFile || !size || !brand || !category || !newProduct || !color || !deporte ) {
        console.error("Por favor complete todos los campos correctamente.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("imageFile", imageFile);
      formData.append("size", size);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("new", newProduct);
      formData.append("color", color);
      formData.append("deporte", deporte);

      const response = await sendProductFormData(formData);

      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Producto creado correctamente!',
          text: `El producto ${name} ha sido creado exitosamente.`,
        });
      } else {
        console.error("Error en la respuesta");
      }
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
    } finally {
      // Limpiar el formulario después de enviarlo
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImageFile(null);
    setSize('');
    setBrand('');
    setCategory('');
    setNewProduct('');
    setColor('');
    setDeporte('');
  };


    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImageFile(selectedImage);
    };

  return (
        <div className="flex flex-col bg-green-200 w-80 border justify-center items-center">
            <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label htmlFor="description">Descripción</label>
            <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <label htmlFor="price">Precio</label>
            <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <label htmlFor="imageFile">Seleccionar imagen:</label>
            <input
            type="file"
            id="imageFile"
            accept="image/*" // Acepta solo archivos de imagen
            onChange={handleImageChange}
            required
            />
            <label htmlFor="size">Tamaño</label>
            <input
                type="text"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
            />
            <label htmlFor="brand">Marca</label>
            <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
            />
            <label htmlFor="category">Categoria</label>
            <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <label htmlFor="new">Nuevo</label>
            <input
                type="text"
                id="new"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                required
            />
            <label htmlFor="color">Color</label>
            <input
                type="text"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
            />
            <label htmlFor="deporte">Deporte</label>
            <input
                type="text"
                id="deporte"
                value={deporte}
                onChange={(e) => setDeporte(e.target.value)}
                required
            />

            <button className="bg-red-200" type="submit">Add</button>
            </form>
        </div>
  )
}

export default ModalNewProduct