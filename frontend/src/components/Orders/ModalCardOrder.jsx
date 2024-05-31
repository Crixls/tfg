import { useEffect, useState } from "react";
import catchOrderLines from "../cathOrderLines";
import catchProducts from "../catchProducts";

const ModalCardOrder = ({ order, closeModal, open }) => {
    const [filterOrderLines, setFilterOrderLines] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState({});
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    useEffect(() => {
        const fetchOrderEntities = async () => {
            try {
                const data = await catchOrderLines();
                const filteredOrderLines = data.filter(orderLine => {
                    const orderId = parseInt(orderLine.orderentity.split('/').pop(), 10);
                    return orderId === parseInt(order.id, 10);
                });
                setFilterOrderLines(filteredOrderLines);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchOrderEntities();
    }, [order]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await catchProducts();
                const productsMap = {};
                filterOrderLines.forEach(orderLine => {
                    const productId2 = parseInt(orderLine.product.split('/').pop(), 10);
                    const product = data.find(product => product.id === productId2);
                    if (product) {
                        const { id, name, contentUrl } = product; // Destructura la información necesaria
                        productsMap[productId2] = { id, name, contentUrl }; // Guarda la información necesaria
                    }
                });
                setRelatedProducts(productsMap);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        if (filterOrderLines.length > 0) {
            fetchProducts();
        }
    }, [filterOrderLines]);

    return (
        <div className={`modal ${open ? 'open' : 'closed'} fixed inset-0 z-50 flex justify-center items-center`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className="cursor-pointer absolute top-4 right-4" onClick={closeModal}>
                <ion-icon style={{ color: "white" }} size="large" name="close"></ion-icon>
            </div>
            <div className={`modal ${open ? 'open' : 'closed'} bg-gray-400 rounded-md p-6 sm:w-2/3 m-4`} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <div className="modal-content">
                    {filterOrderLines.map((product, index) => {
                        const productId = parseInt(product.product.split('/').pop(), 10);
                        const relatedProduct = relatedProducts[productId];
                        return (
                            <div className="flex flex-col items-center justify-center" key={index}>
                                <div className="bg-gray-600 p-10 rounded-lg m-4  md:flex md:justify-center lg:flex lg:justify-center ">
                                    {relatedProduct && relatedProduct.contentUrl ? (
                                        <img src={`${apiUrl}${relatedProduct.contentUrl}`} alt="imagen" className=" md:w-80 lg:max-w-80" />
                                    ) : (
                                        <p className="text-white">Imagen no disponible</p>
                                    )}
                                    <div className="md:pl-6 md:w-60 lg:pl-6 lg:w-60 flex items-center flex-col mt-4">
                                        
                                        {relatedProduct && (
                                            <>
                                                <p className="text-white text-xs md:text-base lg:text-lg pb-6 font-medium">{`${relatedProduct.name}`}</p>
                                            </>
                                        )}
                                        <p className="text-white text-xs p-1 md:text-base lg:text-lg">{`Cantidad: ${product.amount}`}</p>
                                        <p className="text-white text-xs p-1 md:text-base lg:text-lg">{`Color: ${product.unitColor}`}</p>
                                        <p className="text-white text-xs p-1 md:text-base lg:text-lg">{`Precio: ${product.unitPrice}€`}</p>
                                        <p className="text-white text-xs p-1 md:text-base lg:text-lg pb-4">{`Tamaño: ${product.unitSize}`}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex justify-center items-center p-8">
                        <p className="md:text-2xl lg:text-2xl font-bold text-xl text-white">{`Total: ${order.total}€`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCardOrder;
