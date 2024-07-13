'use server'

import { api } from '@/api/api'

interface NewProductFormData {
  Name: string
  Description: string
  Price: number
}

export async function getProducts() {
  const response = await api.get('/product')
  return response.data
}

export async function createProduct(data: NewProductFormData) {
  await api.post('/product', data)
}

export async function deleteProduct(Id: string) {
  console.log(Id)
  await api.delete(`/product/${Id}`)

  return getProducts()
}
