'use server'

import { api } from '@/api/api'
import axios from 'axios'

interface ErrorResponse {
  title: string
  status: number
  errors: { message: string }[]
}
interface CreateProductFormData {
  Name: string
  Description: string
  Price: number
}

interface UpdateProductFormData {
  Id: string
  Name: string
  Description: string
  Price: number
}

export async function getProducts() {
  try {
    const response = await api.get('/product')
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err) && err.response && err.response.data) {
      const errorResponse: ErrorResponse = err.response.data
      console.error(errorResponse.errors[0].message)
      return errorResponse
    } else {
      throw err
    }
  }
}

export async function createProduct(data: CreateProductFormData) {
  try {
    await api.post('/product', data)
  } catch (err) {
    if (axios.isAxiosError(err) && err.response && err.response.data) {
      const errorResponse: ErrorResponse = err.response.data
      console.error(errorResponse.errors[0].message)
      return errorResponse
    } else {
      throw err
    }
  }
}

export async function deleteProduct(Id: string) {
  try {
    await api.delete(`/product/${Id}`)

    return getProducts()
  } catch (err) {
    if (axios.isAxiosError(err) && err.response && err.response.data) {
      const errorResponse: ErrorResponse = err.response.data
      console.error(errorResponse.errors[0].message)
      return errorResponse
    } else {
      throw err
    }
  }
}

export async function updateProduct(data: UpdateProductFormData) {
  try {
    await api.put(`/product/${data.Id}`, data)

    return getProducts()
  } catch (err) {
    if (axios.isAxiosError(err) && err.response && err.response.data) {
      const errorResponse: ErrorResponse = err.response.data
      console.error(errorResponse.errors[0].message)
      return errorResponse
    } else {
      throw err
    }
  }
}
