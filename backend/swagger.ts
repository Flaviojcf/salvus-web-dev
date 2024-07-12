import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'This is an API solution to Salvus Challenge'
    }
  },
  apis: [path.resolve(__dirname, './src/presentation/route/*.swagger.route.ts')]
}

const specs = swaggerJsdoc(options)

export const swaggerUiSetup = swaggerUi.setup(specs)
export const swaggerUiServe = swaggerUi.serve
