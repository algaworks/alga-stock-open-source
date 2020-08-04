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

export const updateProduct = ({ _id, name, price, stock }: Product) =>
  http
    .patch(`/products/${_id}`, {
      ...(_id   && { _id }),
      ...(name  && { name }),
      ...(stock && { stock }),
      ...(price && { price })
    })
    .then(res => res.data)

export const deleteProduct = (productId: string) =>
  http
    .delete(`/products/${productId}`)
    .then(res => res.data)
