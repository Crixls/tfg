import { useEffect, useState } from 'react';
import GraficoCircular from '../../components/Graficos/GraficoCircular'
import { useAuthContext } from '../../context/useAuthContext';
import { getFavorites, getUsers } from '../../api/useCases';

const AdminEstadisticas = () => {
    const { logged } = useAuthContext();
    const [favorites, setFavorites] = useState("");
    const [user, setuser] = useState("");
    
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await getUsers();
                const filteredUser = data.filter(user => {
                    const username = user.username;
                    console.log(username,logged);
                    return username === logged;
                });
                setuser(filteredUser);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchApi();
    }, [logged]);
    
    console.log(user);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await getFavorites();
                const filteredFavorites = data.filter(favorite => {
                    const userId = parseInt(favorite.user.split('/').pop(), 10);
                    console.log(userId,logged);
                    return userId;
                });
                setFavorites(filteredFavorites);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchApi();
    }, [logged]);

    console.log(favorites);
    
    return (
        <div>
            {favorites.length > 0 && <GraficoCircular favorites={favorites} />}
        </div>
    );
}

export default AdminEstadisticas;
