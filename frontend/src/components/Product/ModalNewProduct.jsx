import { useState } from "react";
import Swal from 'sweetalert2';
import { postProduct } from "../../api/api";

const ModalNewProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [deporte, setDeporte] = useState([]);

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
      formData.append("size", JSON.stringify(size)); // Convertir a JSON string
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("new", newProduct);
      formData.append("color", JSON.stringify(color)); // Convertir a JSON string
      formData.append("deporte", JSON.stringify(deporte)); // Convertir a JSON string
      
      {console.log(formData)}

      const response = await postProduct(formData);

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
    setSize([]);
    setBrand('');
    setCategory('');
    setNewProduct('');
    setColor([]);
    setDeporte([]);
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
          onChange={(e) => setPrice(parseFloat(e.target.value))}
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
        <label htmlFor="category">Categoría</label>
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
        <label htmlFor="size">Tamaño (separados por comas)</label>
        <input
          type="text"
          id="size"
          value={size.join(',')}
          onChange={(e) => setSize(e.target.value.split(','))}
          required
        />
        <label htmlFor="color">Color (separados por comas)</label>
        <input
          type="text"
          id="color"
          value={color.join(',')}
          onChange={(e) => setColor(e.target.value.split(','))}
          required
        />
        <label htmlFor="deporte">Deporte (separados por comas)</label>
        <input
          type="text"
          id="deporte"
          value={deporte.join(',')}
          onChange={(e) => setDeporte(e.target.value.split(','))}
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
        <button className="bg-red-200" type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default ModalNewProduct;