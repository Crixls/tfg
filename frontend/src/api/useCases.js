import {get, post, put} from './api';

export const getFavorites = async () => {
    const endpoint = "/api/favorites";
    const data = await get(endpoint);
    return data;
};

export const getProducts = async () => {
    const endpoint = "/api/products";
    const data = await get(endpoint);
    return data;
};


export const createProduct = async (product) => {
    const endpoint = "/api/products/image";
    const response = await post(endpoint, product);
    return response;
};

export const editProduct = async (product) => {
    const endpoint = `/api/products/${product.id}`;
    delete product.id;
    const response = await put(endpoint, product);
    return response;
};

export const getUsers = async () => {
    const endpoint = "/api/users";
    const data = await get(endpoint);
    return data;
};

export const getTotales = async () =>{
    const endpoint = "/productstodos";
    const data = await get(endpoint);
    return data;
}

export const getOneUser = async () =>{
    const endpoint = "/getallusers";
    const data = await get(endpoint);
    return data;
}

export const getUser = async (user) => {
    const endpoint = `/getallusers/${user.id}`;
    delete user.id;
    const response = await put(endpoint, user);
    return response;
};