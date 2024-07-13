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
import { useRef } from 'react'
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

import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { createProduct, getProducts } from '../actions'

type ProductUpsertSheetProps = {
  children?: React.ReactNode
  fetchProducts: () => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const upsertProductSchema = zod.object({
  Name: zod.string(),
  Description: zod.string(),
  Price: zod
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: 'Price must be a number',
    }),
})

export const deleteProductSchema = zod.object({
  Id: zod.string().optional(),
})

export function ProductInsertSheet({
  children,
  fetchProducts,
  loading,
  setLoading,
}: ProductUpsertSheetProps) {
  type NewProductFormData = zod.infer<typeof upsertProductSchema>
  const router = useRouter()

  const newProductFormData = useForm<NewProductFormData>({
    resolver: zodResolver(upsertProductSchema),
  })

  const { handleSubmit, register, reset, watch } = newProductFormData

  const ref = useRef<HTMLDivElement>()

  async function handleCreateProduct(data: NewProductFormData) {
    setLoading(true)

    try {
      await createProduct(data)
      reset()
      fetchProducts()

      toast({
        title: 'Sucesso',
        description: 'Seu produto foi criado com sucesso',
      })
    } catch (error) {
      console.error('Erro ao criar o produto:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet>
      <div>{children}</div>
      <SheetContent>
        <FormProvider {...newProductFormData}>
          <form
            id="upsertProduct"
            onSubmit={handleSubmit(handleCreateProduct)}
            className="space-y-8"
          >
            <SheetHeader>
              <SheetTitle>Crie um novo produto</SheetTitle>
              <SheetDescription>
                Adicione as informações do novo produto aqui. Depois clique para
                salvar.
              </SheetDescription>
            </SheetHeader>

            <FormField
              name="title"
              render={() => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o título da tarefa"
                      {...register('Name')}
                    />
                  </FormControl>
                  <FormDescription>Este será o nome exibido</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
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
                    Este será a descrição exibida
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
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
                form="upsertProduct"
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
