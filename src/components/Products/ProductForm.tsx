import React, { useState, useEffect } from 'react'

import Form from '../../shared/Form'
import Input from '../../shared/Input'
import { Product } from '../../shared/Table/Table.mockdata'
import { Grid, Button } from '@material-ui/core'

declare interface InitialFormState {
  _id?: string
  name: string
  price: string
  stock: string
}

export interface ProductCreator {
  name: string
  price: number
  stock: number
}

declare interface ProductFormProps {
  form?: Product
  onSubmit?: (product: ProductCreator) => void
  onUpdate?: (product: Product) => void
}

const ProductForm: React.FC<ProductFormProps> = (props) => {
  const initialFormState: InitialFormState = props.form
    ? {
        _id: props.form._id,
        name: props.form.name,
        price: String(props.form.price),
        stock: String(props.form.stock),
      }
    : {
        name: '',
        price: '',
        stock: ''
      }

  const [form, setForm] = useState(initialFormState)

  useEffect(() => {
    setForm(initialFormState)
  }, [props.form])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setForm({
      ...form,
      [name]: value
    })
  }

  const updateProduct = (product: InitialFormState) => {
    const productDto = {
      _id: String(product._id),
      name: String(product.name),
      price: parseFloat(product.price),
      stock: Number(product.stock)
    }

    props.onUpdate &&
      props.onUpdate(productDto)
  }

  const createProduct = (product: InitialFormState) => {
    const productDto = {
      name: String(product.name),
      price: parseFloat(product.price),
      stock: Number(product.stock)
    }

    props.onSubmit &&
      props.onSubmit(productDto)
  }

  const handleFormSubmit = () => {
    form._id
      ? updateProduct(form)
      : createProduct(form)
    
    setForm(initialFormState)
  }

  return <Form title="Product form" onSubmit={handleFormSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Input
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
          value={form.name}
          name="name"
          label="Name"
          placeholder="E.g.: Cookie"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
          value={form.price}
          name="price"
          label="Price"
          type="number"
          placeholder="E.g.: 1.25"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
          value={form.stock}
          name="stock"
          label="Stock"
          type="number"
          placeholder="E.g.: 15"
          required
        />
      </Grid>
      <Grid container justify="flex-end" >
        <Button type="submit" color="primary" variant="contained" >
          {
            form._id ? 'Update' : 'Submit'
          }
        </Button>
      </Grid>
    </Grid>
    
    
  </Form>
}

export default ProductForm