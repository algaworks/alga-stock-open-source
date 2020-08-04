import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Swal from 'sweetalert2'
import { Product } from '../shared/Table/Table.mockdata'
import Container from '../shared/Container'
import Table from '../shared/Table'
import { TableHeader } from '../shared/Table'
import ProductForm, { ProductCreator } from '../components/Products/ProductForm'
import * as Products from '../services/Products.service'

const headers: TableHeader[] = [
  { key: 'name', value: 'Product' },
  { key: 'price', value: 'Price', right: true },
  { key: 'stock', value: 'Available Stock', right: true }
]

const ProductsView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(undefined)

  async function fetchData() {
    try {
      const _products = await Products.getAllProducts()
      setProducts(_products) 
    } catch (err) {
      Swal.fire('Oops!', err.response.message || err.message, 'error')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleProductSubmit = async (product: ProductCreator) => {
    try {
      await Products.createProduct(product)
      fetchData()
      Swal.fire('Uhul!', 'Product successfully created', 'success')
    } catch (err) {
      Swal.fire('Oops!', err.response?.message || err.message, 'error')
    }
  }

  const handleProductUpdate = async (newProduct: Product) => {
    try {
      Products.updateProduct(newProduct)
      setUpdatingProduct(undefined)
      fetchData()
    } catch (err) {
      Swal.fire('Oops!', err.response?.message || err.message, 'error')
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      await Products.deleteProduct(id)
      fetchData()
      Swal.fire(
        'Deleted!',
        'The product has been deleted.',
        'success'
      )
    } catch (err) {
      Swal.fire('Oops!', err.response?.message || err.message, 'error')
    }
  }

  const handleProductDelete = (product: Product) => {
    Swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#09f',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, delete ${product.name}!`
      })
      .then((result) => {
        if (result.value) {
          deleteProduct(product._id)
        }
      })
  }

  const handleProductDetail = (product: Product) => {
    Swal.fire(
      'Product details',
      `${product.name} costs $${product.price} and we have ${product.stock} available in stock.`,
      'info'
    )
  }

  const handleProductEdit = (product: Product) => {
    setUpdatingProduct(product)
  }

  return (
    <div className="App">
      <Header title="AlgaStock" />
      <Container>
        <Table
          headers={headers}
          data={products}
          enableActions
          onDelete={handleProductDelete}
          onDetail={handleProductDetail}
          onEdit={handleProductEdit}
        />

        <ProductForm
          form={updatingProduct}
          onSubmit={handleProductSubmit}
          onUpdate={handleProductUpdate}
        />
      </Container>
    </div>
  )
}

export default ProductsView