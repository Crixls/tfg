import { useState } from "react";
import Swal from 'sweetalert2';
import { postProduct } from "../../api/api";

const ModalNewProduct = ({  open, closeModal,onProductCreated  }) => {
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
      formData.append("size", JSON.stringify(size)); 
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("new", newProduct);
      formData.append("color", JSON.stringify(color)); 
      formData.append("deporte", JSON.stringify(deporte)); 
      
      {console.log(formData)}

      const response = await postProduct(formData);

      onProductCreated(response);
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
    <div className={`modal ${open ? 'open' : 'closed'} fixed inset-0 z-50 flex justify-center items-center `}  style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
      <div className="cursor-pointer absolute top-4 right-4" onClick={closeModal}>
        <ion-icon style={{color:"white"}} size="large" name="close"></ion-icon>
      </div>    
      <div className="flex flex-col justify-center items-center rounded-md md:mt-20 ">
        <form className="flex flex-col p-4   bg-gray-200" onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-bold m-2">Nombre</label>
          <input
            className="rounded-md ml-2 mr-2"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="description" className="font-bold m-2">Descripción</label>
          <input
            className="rounded-md  ml-2 mr-2"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="price" className="font-bold m-2">Precio</label>
          <input
            className="rounded-md  ml-2 mr-2"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
          <label htmlFor="brand" className="font-bold m-2">Marca</label>
          <input
            className="rounded-md  ml-2 mr-2"
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
          <label htmlFor="category" className="font-bold m-2">Categoría</label>
          <input
            className="rounded-md ml-2 mr-2"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <label htmlFor="new" className="font-bold m-2">Nuevo</label>
          <input
            className="rounded-md ml-2 mr-2"
            type="text"
            id="new"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            required
          />
          <label htmlFor="size" className="font-bold m-2">Tamaño (separados por comas)</label>
          <input
            className="rounded-md ml-2 mr-2"
            type="text"
            id="size"
            value={size.join(',')}
            onChange={(e) => setSize(e.target.value.split(','))}
            required
          />
          <label htmlFor="color" className="font-bold m-2">Color (separados por comas)</label>
          <input 
            className="rounded-md ml-2 mr-2"
            type="text"
            id="color"
            value={color.join(',')}
            onChange={(e) => setColor(e.target.value.split(','))}
            required
          />
          <label htmlFor="deporte" className="font-bold m-2">Deporte (separados por comas)</label>
          <input
            className="rounded-md ml-2 mr-2"
            type="text"
            id="deporte"
            value={deporte.join(',')}
            onChange={(e) => setDeporte(e.target.value.split(','))}
            required
          />
          <label htmlFor="imageFile" className="font-bold m-2">Seleccionar imagen:</label>
          <input
            className="ml-2 mr-2"
            type="file"
            id="imageFile"
            accept="image/*" 
            onChange={handleImageChange}
            required
          />
          <button className='p-2  mt-4 rounded-md bg-white m-4 border-2 border-black font-medium' type="submit">Enviar</button> 

        </form>
      </div>
    </div>
  );
}

export default ModalNewProduct;