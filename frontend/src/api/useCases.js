// Métodos para llamar a la API

import {deleteFav, get, post, postFav, put} from './api';

export const getFavorites = async () => {
    const endpoint = "/api/favorites";
    const data = await get(endpoint);
    return data;
};

export const getFavorite = async (favorite) => {
    console.log(favorite.id)
    const endpoint = `/api/favorites/${favorite.id}`;
    delete favorite.id;
    const response = await get(endpoint);
    return response;
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

export const getOneProduct = async (endpoint) => {
    const response = await get(endpoint);
    return response;
};

export const getProduct = async (endpoint) => {
    const response = await get(endpoint);
    return response;
};

export const postFavorites = async (idShoe,idUser) => {
    const endpoint = `/api/favorites`;
    const productPath= `/api/products/${idShoe}`;
    const userPath= `/api/users/${idUser}`;
    const response = await postFav(endpoint, userPath, productPath);
    return response;
};

export const deleteFavorite2 = async (product) => {
    const endpoint = `/api/favorites/${product.id}`;
    const response = await deleteFav(endpoint);
    return response;
};

export const getUsers = async () => {
    const endpoint = "/api/users";
    const data = await get(endpoint);
    return data;
};
export const getOrderEntities = async () => {
    const endpoint = "/api/order_entities";
    const data = await get(endpoint);
    return data;
};
export const getOrderLines = async () => {
    const endpoint = "/api/order_lines";
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