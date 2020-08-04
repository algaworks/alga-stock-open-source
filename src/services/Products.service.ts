import http from '../utils/http';
import { ProductCreator } from '../components/Products/ProductForm';
import { Product } from '../shared/Table/Table.mockdata';

export const getAllProducts = () =>
  http
    .get('/products')
    .then(res => res.data)

export const getSingleProduct = (productId: number) =>
  http
    .get(`/products/${productId}`)
    .then(res => res.data)

export const createProduct = (product: ProductCreator) =>
  http
    .post('/products', product)
    .then(res => res.data)

export const updateProduct = (newProduct: Product) =>
  http
    .patch(`/products/${newProduct._id}`, newProduct)
    .then(res => res.data)

export const deleteProduct = (productId: number) =>
  http
    .delete(`/products/${productId}`)
    .then(res => res.data)
