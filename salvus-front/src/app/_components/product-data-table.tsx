'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { deleteProduct, getProducts } from '../actions'
import { useState } from 'react'
import { ProductInsertSheet } from './product-upsert-sheet'
import { SheetTrigger } from '@/components/ui/sheet'
import { formatPriceBRL } from '@/utils/format-brl-price'
import { ProductUpdateSheet } from './product-update-sheet'

interface Product {
  Id: string
  Name: string
  Description: string
  Price: number
  CreatedAt: string
}

type ProductDataTableProps = {
  data: Product[]
}

export interface ErrorResponse {
  title: string
  status: number
  errors: { message: string }[]
}

export function ProductDataTable({ data: initialData }: ProductDataTableProps) {
  const [data, setData] = useState<Product[]>(initialData)
  const [loading, setLoading] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  async function handleDeleteProduct(id: string) {
    setLoading(true)
    try {
      const error: ErrorResponse = await deleteProduct(id)
      await fetchProducts()

      if (!error != null) {
        toast({
          title: 'Sucesso',
          description: 'O produto foi deletado com sucesso',
        })
      } else {
        toast({
          title: 'Error',
          description: error.errors[0].message,
        })
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  async function fetchProducts() {
    try {
      const products = await getProducts()
      setData(products)
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error)
    }
  }

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'id',
      header: () => <div>Id</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.Id}</div>
      },
    },
    {
      accessorKey: 'Name',
      header: () => <div>Nome</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.Name}</div>
      },
    },
    {
      accessorKey: 'Description',
      header: () => <div>Descrição</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.Description}</div>
      },
    },
    {
      accessorKey: 'Price',
      header: ({ column }) => {
        return (
          <div>
            <Button
              variant="link"
              className="p-0"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Preço
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => {
        const formattedPrice = formatPriceBRL(row.original.Price)
        return <div className="font-medium">{formattedPrice}</div>
      },
    },
    {
      accessorKey: 'CreatedAt',
      header: ({ column }) => {
        return (
          <div>
            <Button
              variant="link"
              className="p-0"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Data de Criação
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.CreatedAt}</div>
      },
    },
    {
      accessorKey: 'Ações',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="h-8 w-8 p-0">
                <span className="sr-only" />
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.Id)}
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <ProductUpdateSheet
                product={product}
                fetchProducts={fetchProducts}
                setLoading={setLoading}
              >
                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  Atualizar produto
                </div>
              </ProductUpdateSheet>
              <DropdownMenuItem onClick={() => handleDeleteProduct(product.Id)}>
                Deletar produto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <ProductInsertSheet fetchProducts={fetchProducts} setLoading={setLoading}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="mb-4 ml-auto flex max-lg:m-auto max-lg:mb-4"
          >
            <PlusIcon className="mr-3 h-4 w-4" />
            Adicionar Produto
          </Button>
        </SheetTrigger>
      </ProductInsertSheet>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex h-full w-full items-center justify-center space-x-2">
                    <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-black border-opacity-90 dark:border-white"></div>
                    <div>Carregando...</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} item(s) registrados.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
