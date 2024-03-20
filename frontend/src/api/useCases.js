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

export const getProductsTodos = async () => {
    const endpoint = "/api/productstodos";
    const data = await get(endpoint);
    return data;
};

export const createProduct = async (product) => {
    const endpoint = "/api/products";
    const response = await post(endpoint, product);
    return response;
};

export const editProduct = async (product) => {
    const endpoint = `/api/products/${product.id}`;
    delete product.id;
    const response = await put(endpoint, product);
    return response;
  };