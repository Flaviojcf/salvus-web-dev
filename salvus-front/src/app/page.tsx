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

export default function Home() {
  const mockProducts = [
    {
      id: 'gae62uBhczoLR',
      title: 'string',
      description: 'string',
      price: 10,
      createdAt: new Date(),
    },
    {
      id: 'gae62uBhczoLR',
      title: 'string',
      description: 'string',
      price: 10,
      createdAt: new Date(2),
    },
  ]

  return (
    <DashBoardPage>
      <DashBoardPageHeader className="max-h-[49px]">
        <DashBoardPageHeaderTitle>Produtos</DashBoardPageHeaderTitle>
        <ProductInsertSheet>
          <Button variant="outline" size="sm">
            <PlusIcon className="mr-3 h-4 w-4" />
            Adicionar Produto
          </Button>
        </ProductInsertSheet>
      </DashBoardPageHeader>
      <DashBoardPageMain>
        <ProductDataTable data={mockProducts} />
      </DashBoardPageMain>
    </DashBoardPage>
  )
}
