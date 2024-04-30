import { useEffect, useState } from "react";
import { getOrderLines, getProducts } from "../../api/useCases";

const ModalCardOrder = ({ order, closeModal, open }) => {
    const [filterOrderLines, setFilterOrderLines] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState({});

    useEffect(() => {
        const fetchOrderEntities = async () => {
            try {
                const data = await getOrderLines();
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
                const data = await getProducts();
                const productsMap = {};
                filterOrderLines.forEach(async orderLine => {
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
        <div className={`modal ${open ? 'open' : 'closed'} fixed inset-0 z-50 flex justify-center items-center`} style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            <div className="cursor-pointer absolute top-4 right-4" onClick={closeModal}>
                <ion-icon style={{color:"white"}} size="large" name="close"></ion-icon>
            </div>     
            <div className={`modal ${open ? 'open' : 'closed'} bg-gray-400 rounded-md w-1/4 m-40`}>
                <div className="modal-content">
                    {filterOrderLines.map((product, index) => (
                        <div className="flex justify-center items-center" key={index}>
                            <div className="p-20">
                                {relatedProducts[parseInt(product.product.split('/').pop(), 10)] && (
                                    <>
                                        <p className="text-white p-1 text-lg pb-8">{`Nombre del producto: ${relatedProducts[parseInt(product.product.split('/').pop(), 10)].name}`}</p>
                                    </>
                                )}
                                <p className="text-white p-1">{`Cantidad: ${product.amount}`}</p>
                                <p className="text-white p-1">{`Color: ${product.unitColor}`}</p>
                                <p className="text-white p-1">{`Precio: ${product.unitPrice}`}</p>
                                <p className="text-white p-1">{`Tamaño: ${product.unitSize}`}</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center items-center p-10">
                        <p className="text-2xl font-bold text-white">{`Total: ${order.total}€`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCardOrder;
