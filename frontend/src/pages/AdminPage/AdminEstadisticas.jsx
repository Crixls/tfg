import React, { useEffect, useState } from 'react';
import GraficoCircular from '../../components/Graficos/GraficoCircular'
import { useAuthContext } from '../../context/useAuthContext';
import { getFavorites, getOrderEntities, getOrderLines, getUsers } from '../../api/useCases';
import { useNavigate } from "react-router-dom";
import GraficoBarras from '../../components/Graficos/GraficoBarras';
import GraficoProductos from '../../components/Graficos/GraficoProductos';
import Loaderanimated from '../../components/Loaderanimated'; 
import fondo from '../../assets/favorite/favoritetext.jpg';

const AdminEstadisticas = () => {
    const { logged } = useAuthContext();
    const [favorites, setFavorites] = useState("");
    const [data, setData] = useState([]); 
    const [dataBar, setDataBar] = useState([]); 
    const [dataProductos, setDataProductos] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();
    
    const handleReturn =()=>{
        navigate("../")
    }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true); 
                const data = await getFavorites();
                setFavorites(data);
                const productCount = {};
                data.forEach((favorite) => {
                    const idproduct = parseInt(favorite.product.split('/').pop(), 10);
                    if (productCount[idproduct]) {
                        productCount[idproduct] += 1;
                    } else {
                        productCount[idproduct] = 1;
                    }
                });
                const formattedData = Object.keys(productCount).map((idproduct) => ({
                    name: idproduct,
                    value: productCount[idproduct],
                }));
                setData(formattedData); 
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchApi();
    }, [logged]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true); 
                const data = await getOrderEntities();
                const currentYear = new Date().getFullYear();
                const orderEntitiesCount = {};
    
                for (let month = 1; month <= 12; month++) {
                    const filteredData = data.filter(order => {
                        const orderDate = new Date(order.date);
                        return orderDate.getFullYear() === currentYear && orderDate.getMonth() + 1 === month;
                    });
    
                    orderEntitiesCount[month] = filteredData.length;
                }
    
                const formattedData = Object.keys(orderEntitiesCount).map(month => ({
                    name: getMonthName(parseInt(month)), 
                    value: orderEntitiesCount[month], 
                }));
                setDataBar(formattedData); 
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchApi();
    }, [logged]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true); 
                const data = await getOrderLines();

                const productCountTwo = {};
                data.forEach((producto) => {
                    const idproduct = parseInt(producto.product.split('/').pop(), 10);
                    if (productCountTwo[idproduct]) {
                        productCountTwo[idproduct] += 1;
                    } else {
                        productCountTwo[idproduct] = 1;
                    }
                });
                const formattedData = Object.keys(productCountTwo).map((idproduct) => ({
                    name: idproduct,
                    value: productCountTwo[idproduct],
                }));
                setDataProductos(formattedData); 
               
                // setDataBar(formattedData); 
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchApi();
    }, [logged]);

    const getMonthName = (monthNumber) => {
        const months = [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun",
            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ];
        return months[monthNumber - 1]; 
    };

    return (
        <>
            <div className="p-4 mt-10" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> 
                <p className="text-white flex w-full text-2xl font-bold">ESTADÍSTICAS</p>
            </div>
            <div className='h-screen '>
                {loading ? ( 
                    <div className="flex justify-center items-center mt-60">
                        <Loaderanimated />
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid  md:mt-10 sm:flex-col sm:justify-center sm:items-center">
                        <div className=' m-10  sm:flex-col sm:justify-center sm:items-center'>
                            <p className='text-2xl font-semibold p-10 lg:pl-32 sm:flex sm:justify-center sm:items-center '>EL PRODUCTO MÁS VECES FAVORITO</p>
                            {favorites.length > 0 && <GraficoCircular data={data} />} {/* Pasar los datos al componente GraficoCircular */}
                        </div>
                        <div className='m-10 sm:flex-col sm:justify-center sm:items-center'>
                            <p className='text-2xl font-semibold p-10 lg:pl-32 sm:flex sm:justify-center sm:items-center'>VENTAS MENSUALES</p>
                            {dataBar.length > 0 && <GraficoBarras dataBar={dataBar} />} {/* Pasar los datos al componente GraficoCircular */}
                        </div>
                        <div className='m-10 sm:flex-col sm:justify-center sm:items-center'>
                            <p className='text-2xl font-semibold p-10 lg:pl-32 sm:flex sm:justify-center sm:items-center '>PRODUCTOS MÁS PEDIDO</p>
                            {dataProductos.length > 0 && <GraficoProductos dataProductos={dataProductos} />} {/* Pasar los datos al componente GraficoCircular */}
                        </div>
                    </div>
                )}
                <button className='border-2 border-black rounded-lg m-4 font-medium p-2' onClick={handleReturn}>Volver</button>
            </div>
        </>
    );
}

export default AdminEstadisticas;
