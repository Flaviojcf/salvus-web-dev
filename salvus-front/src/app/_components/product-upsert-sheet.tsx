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

type TodoUpsertSheetProps = {
  children?: React.ReactNode
}

export const upsertTodoSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  price: zod.number(),
})

export const deleteTodoSchema = zod.object({
  id: zod.string().optional(),
})

export function ProductInsertSheet({ children }: TodoUpsertSheetProps) {
  type NewTodoFormData = zod.infer<typeof upsertTodoSchema>
  const router = useRouter()

  const newTodoFormData = useForm<NewTodoFormData>({
    resolver: zodResolver(upsertTodoSchema),
  })

  const { handleSubmit, register, reset, watch } = newTodoFormData

  const ref = useRef<HTMLDivElement>()

  async function handleSendTodo(data: NewTodoFormData) {
    reset()
    router.refresh()
    ref.current?.click()

    toast({
      title: 'Sucesso',
      description: 'Seu produto foi criado com sucesso',
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <FormProvider {...newTodoFormData}>
          <form
            id="upsertTodo"
            onSubmit={handleSubmit(handleSendTodo)}
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
                      {...register('title')}
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
                      {...register('description')}
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
              name="description"
              render={() => (
                <FormItem>
                  <FormLabel>Preço do produto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe o preço do produto"
                      {...register('price')}
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
                form="upsertTodo"
                disabled={
                  !(watch('title') && watch('description') && watch('price'))
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
