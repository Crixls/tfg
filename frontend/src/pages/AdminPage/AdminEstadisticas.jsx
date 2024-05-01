import { useEffect, useState } from 'react';
import GraficoCircular from '../../components/Graficos/GraficoCircular'
import { useAuthContext } from '../../context/useAuthContext';
import { getFavorites, getOrderEntities, getOrderLines, getUsers } from '../../api/useCases';
import { useNavigate } from "react-router-dom";
import GraficoBarras from '../../components/Graficos/GraficoBarras';
import GraficoProductos from '../../components/Graficos/GraficoProductos';


const AdminEstadisticas = () => {
    const { logged } = useAuthContext();
    const [favorites, setFavorites] = useState("");
    const [data, setData] = useState([]); // Nuevo estado para almacenar los datos del gráfico
    const [dataBar, setDataBar] = useState([]); // Nuevo estado para almacenar los datos del gráfico
    const [dataProductos, setDataProductos] = useState([]); // Nuevo estado para almacenar los datos del gráfico
    const navigate = useNavigate();
    
    const handleReturn =()=>{
        navigate("../")
    }

    
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await getFavorites();
                
                setFavorites(data);

                // Contar los favoritos y formatear los datos para el gráfico circular
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
                setData(formattedData); // Actualizar el estado con los datos formateados
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchApi();
    }, [logged]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await getOrderEntities();
                const currentYear = new Date().getFullYear();
                const orderEntitiesCount = {};
    
                // Iterar sobre cada mes del año
                for (let month = 1; month <= 12; month++) {
                    const filteredData = data.filter(order => {
                        const orderDate = new Date(order.date);
                        return orderDate.getFullYear() === currentYear && orderDate.getMonth() + 1 === month;
                    });
    
                    // Contar la cantidad de orderentities para el mes actual
                    orderEntitiesCount[month] = filteredData.length;
                }
    
                // Formatear los datos para el gráfico de barras
                const formattedData = Object.keys(orderEntitiesCount).map(month => ({
                    name: getMonthName(parseInt(month)), // Obtener el nombre del mes
                    value: orderEntitiesCount[month], // La cantidad de orderentities en ese mes
                }));
                setDataBar(formattedData); // Actualizar el estado con los datos formateados
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchApi();
    }, [logged]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
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
                setDataProductos(formattedData); // Actualizar el estado con los datos formateados
               
                // setDataBar(formattedData); // Actualizar el estado con los datos formateados
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchApi();
    }, [logged]);

    console.log(dataProductos);

    
    // Función para obtener el nombre del mes a partir de su número
    const getMonthName = (monthNumber) => {
        const months = [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun",
            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ];
        return months[monthNumber - 1]; // Los meses comienzan en 0 en JavaScript, por lo que se resta 1
    };
    



    console.log(dataBar);

    return (
        <>
            <div className="p-4 mt-10" style={{ backgroundImage: 'url(/src/assets/favorite/favoritetext.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}> 
                <p className="text-white flex w-full text-2xl font-bold">ESTADÍSTICAS</p>
            </div>
            <div className='h-screen '>
            <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid  md:mt-10">
                    <div className=' m-10'>
                        <p className='text-2xl font-semibold pl-16 p-10 '>EL PRODUCTO MÁS VECES FAVORITO</p>
                        {favorites.length > 0 && <GraficoCircular data={data} />} {/* Pasar los datos al componente GraficoCircular */}
                    </div>
                    <div className='m-10'>
                        <p className='text-2xl font-semibold p-10 pl-32 '>VENTAS MENSUALES</p>
                        {dataBar.length > 0 && <GraficoBarras dataBar={dataBar} />} {/* Pasar los datos al componente GraficoCircular */}
                    </div>
                    <div className='m-10 md:flex md:justify-center items-center flex-col'>
                        <p className='text-2xl font-semibold p-10 lg:pl-32 '>PRODUCTOS MÁS PEDIDO</p>
                        {dataProductos.length > 0 && <GraficoProductos dataProductos={dataProductos} />} {/* Pasar los datos al componente GraficoCircular */}
                    </div>
                </div>
                <button className='border-2 border-black rounded-lg m-4 font-medium p-2' onClick={handleReturn}>Volver</button>
            </div>
        </>

    );
}

export default AdminEstadisticas;
