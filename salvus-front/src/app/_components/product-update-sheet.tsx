'use client'

import * as zod from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { toast } from '@/components/ui/use-toast'
import { updateProduct } from '../actions'
import { ErrorResponse } from './product-data-table'

interface Product {
  Id: string
  Name: string
  Description: string
  Price: number
  CreatedAt: string
}

type ProductUpdateSheetProps = {
  product: Product
  fetchProducts: () => void
  setLoading: (loading: boolean) => void
  children?: React.ReactNode
}

export const updateProductSchema = zod.object({
  Id: zod.string(),
  Name: zod.string(),
  Description: zod.string(),
  Price: zod.union([
    zod.string().transform((val) => parseFloat(val)),
    zod.number(),
  ]),
  CreatedAt: zod.string(),
})

export function ProductUpdateSheet({
  product,
  fetchProducts,
  children,
  setLoading,
}: ProductUpdateSheetProps) {
  type UpdateProductFormData = zod.infer<typeof updateProductSchema>

  const updateProductFormData = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      Id: product.Id,
      Name: product.Name,
      Description: product.Description,
      Price:
        typeof product.Price === 'number'
          ? product.Price
          : parseFloat(product.Price as string),
      CreatedAt: product.CreatedAt,
    },
  })

  const { handleSubmit, register, reset, watch } = updateProductFormData

  async function handleUpdateProduct(data: UpdateProductFormData) {
    setLoading(true)
    try {
      const error: ErrorResponse = await updateProduct(data.Id, data)

      reset()
      fetchProducts()

      if (!error != null) {
        toast({
          title: 'Sucesso',
          description: 'O produto foi atualizado com sucesso',
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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <FormProvider {...updateProductFormData}>
          <form
            id="updateProduct"
            onSubmit={handleSubmit(handleUpdateProduct)}
            className="space-y-8"
          >
            <SheetHeader>
              <SheetTitle>Atualizar Produto</SheetTitle>
              <SheetDescription>
                Atualize as informações do produto aqui. Depois clique para
                salvar.
              </SheetDescription>
            </SheetHeader>

            <FormField
              name="Name"
              render={() => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do produto"
                      {...register('Name')}
                    />
                  </FormControl>
                  <FormDescription>Este será o nome exibido</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="Description"
              render={() => (
                <FormItem>
                  <FormLabel>Descrição do produto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe a descrição do produto"
                      {...register('Description')}
                    />
                  </FormControl>
                  <FormDescription>
                    Esta será a descrição exibida
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="Price"
              render={() => (
                <FormItem>
                  <FormLabel>Preço do produto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe o preço do produto"
                      type="number"
                      {...register('Price')}
                    />
                  </FormControl>
                  <FormDescription>Este será o preço exibido</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="mt-auto">
              <Button
                type="submit"
                form="updateProduct"
                disabled={
                  !(watch('Name') && watch('Description') && watch('Price'))
                }
              >
                Salvar
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  )
}
