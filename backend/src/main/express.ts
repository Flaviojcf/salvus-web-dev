import express from 'express'
import cors from 'cors'
import { getProductRouter } from '@/presentation/route/ProductRoute'
import { type UseCases } from '@/presentation/interfaces/UseCases'

function setRoutes (app: express.Express, useCases: UseCases): void {
  const productRouter = getProductRouter(useCases)
  app.use(productRouter)
}

export function main (useCases: UseCases): void {
  const app = express()

  app.use(express.json())
  app.use(cors())

  setRoutes(app, useCases)

  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}
