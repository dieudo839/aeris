
import axios from 'axios';

const API_URL = "http://localhost:8000/api/";

export const productsAPI = {
  getAll: () => axios.get(API_URL + "products/"),
  create: (data) => axios.post(API_URL + "products/", data),
  update: (id, data) => axios.put(API_URL + `products/${id}/`, data),
  delete: (id) => axios.delete(API_URL + `products/${id}/`)
};

export const categoriesAPI = {
  getAll: () => axios.get(API_URL + "categories/"),
  create: (data) => axios.post(API_URL + "categories/", data),
  update: (id, data) => axios.put(API_URL + `categories/${id}/`, data),
  delete: (id) => axios.delete(API_URL + `categories/${id}/`)
};
