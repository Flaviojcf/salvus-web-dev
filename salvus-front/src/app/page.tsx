'use client'
import {
  DashBoardPage,
  DashBoardPageHeader,
  DashBoardPageHeaderTitle,
  DashBoardPageMain,
} from '@/components/dashboard/page'
import { ProductInsertSheet } from './_components/product-upsert-sheet'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { ProductDataTable } from './_components/product-data-table'
import { getProducts } from './actions'
import { useEffect, useState } from 'react'
import { Loading } from './_components/loading'

interface Product {
  Id: string
  Name: string
  Description: string
  Price: number
  CreatedAt: string
}

export default function Home() {
  const [product, setProduct] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function getProduct() {
    try {
      const response = await getProducts()
      setProduct(response)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <DashBoardPage>
      <DashBoardPageHeader className="max-h-[49px]">
        <DashBoardPageHeaderTitle>Produtos</DashBoardPageHeaderTitle>
      </DashBoardPageHeader>
      <DashBoardPageMain>
        {isLoading ? <Loading /> : <ProductDataTable data={product} />}
      </DashBoardPageMain>
    </DashBoardPage>
  )
}
