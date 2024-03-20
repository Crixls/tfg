import { useState } from "react";
import Swal from 'sweetalert2';
import { useEntitiesContext } from "../context/useEntitiesContext";
// import { Modal } from "bootstrap";


const ModalNewProduct = (props) => {
    const { addProduct } = useEntitiesContext();

    const { open, closeModal } = props;



    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [newProduct, setNewProduct] = useState('');
    const [color, setColor] = useState('');
    const [deporte, setDeporte] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(image.name);

        try {
            if (!name || !description || !price || !image || !size || !brand || !category || !newProduct || !color || !deporte ) {
                console.error("Por favor complete todos los campos correctamente.");
                return;
            }
            console.log(image)
            const productData = ({
                name: name,
                description: description,
                price: price,
                image: image.name,
                brand: brand,
                category: category,
                new: newProduct,
                color: color,
                deporte: deporte,
            });

            const response = await addProduct(productData);

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
            handleModalClose(); // Cerrar el modal después de enviar el formulario
        }
    }
        
    const handleModalClose = () => {
        // setOpen(false); // Cerrar el modal
        closeModal();
        // Resetear los estados del formulario
        setName('');
        setDescription('');
        setPrice('');
        setImage('');
        setSize('');
        setBrand('');
        setCategory('');
        setNewProduct('');
        setColor('');
        setDeporte('');
    };


    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

  return (
        <div className="flex flex-col bg-blue-200 w-80 border justify-center items-center">
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
            <label htmlFor="image">Seleccionar imagen:</label>
            <input
            type="file"
            id="image"
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