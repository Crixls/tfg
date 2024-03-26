import { useEffect, useState } from "react";
import { useEntitiesContext } from "../context/useEntitiesContext";
import {  getFavorites, getUsers } from "../api/useCases";
import {  useNavigate } from 'react-router-dom';



const CardShoes = ({ typeShoe }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { favorites, addFavorite, removeFavorite } = useEntitiesContext(); // Obtiene el estado y las funciones del contexto
    const navigate= useNavigate();
    const {updateDetails}= useEntitiesContext();


    // console.log(favorites);

    const [favoritos, setFavoritos] = useState([]);
    const [useLogged, setUseLogged] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [stateFav, setstateFav] = useState(false);
    const [idUser, setIdUser] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await getUsers();
                setAllUsers(data);
                console.log("Users:", data);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('UserToken');
        if (storedUser) {
            setUseLogged(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        // Encuentra el id del usuario logueado
        const foundUser = allUsers.find(user => user.username === useLogged.login);
        if (foundUser) {
            setIdUser(foundUser.id);
        }
    }, [allUsers, useLogged]);

    useEffect(() => {
        const fetchApi = async () => {
          try {
            const data = await getFavorites();
            setFavoritos(data);
          } catch (error) {
            console.log("Error:", error);
          }
        };
        fetchApi();
      }, []);



    // Verifica si el producto actual está en la lista de favoritos
    const isFavorite = favorites.includes(typeShoe.id);

    const handleLike = (idShoe) => {
        if (!isFavorite) {
            // Verificar si idUser es válido
            if (idUser) {
                addFavorite(idShoe, idUser); // Agregar a favoritos
            } else {
                console.warn("El ID de usuario no está disponible aún.");
            }
            setstateFav(true);
        }
    }

    const handleNotLike = (idShoe) => {
        console.log(idShoe)
        const favoriteIndex = favoritos.findIndex(favorite => favorite.product === `/api/products/${idShoe}`);
        console.log(favoritos)
        console.log(favoriteIndex);
        if (favoriteIndex !== -1) {
            const favoritoId = favoritos[favoriteIndex].id;
            removeFavorite(favoritoId);
        }
        setstateFav(false);
    }

    const handleFlip = () => {
        updateDetails(typeShoe);
        navigate("/shoe");
    }
    
    

    return (
        <div className="flex justify-center items-center flex-col bg-slate-100 w-80 m-4 p-4 border-none rounded-md" onClick={handleFlip}>
            <img src={`${apiUrl}${typeShoe.contentUrl}`} alt="productos" className="w-40"/>
            <p>Name: {typeShoe.name}</p>
            <p>Description: {typeShoe.description}</p>
            <p className="font-bold">{typeShoe.price} €</p>
            {stateFav ? (
                <button onClick={() => handleNotLike(typeShoe.id)}>
                    <ion-icon name="heart"></ion-icon>
                </button>
            ) : (
                <button onClick={() => handleLike(typeShoe.id)}>
                    <ion-icon name="heart-outline"></ion-icon>
                </button>
            )}
            
        </div>
    );
}

export default CardShoes;
