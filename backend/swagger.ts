import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      description: 'Operations related to products',
      version: '1.0.0'
    },
    components: {
      schemas: {
        CreateProductDTO: {
          type: 'object',
          properties: {
            Id: { type: 'string' },
            Name: { type: 'string' },
            Description: { type: 'string' },
            Price: { type: 'number' }
          }
        },
        UpdateProductDTO: {
          type: 'object',
          properties: {
            Id: { type: 'string' },
            Name: { type: 'string' },
            Description: { type: 'string' },
            Price: { type: 'number' }
          }
        }
      }
    }
  },
  apis: [path.resolve(__dirname, './src/presentation/route/*.swagger.js')]
}

const specs = swaggerJsdoc(options)

export const swaggerUiSetup = swaggerUi.setup(specs)
export const swaggerUiServe = swaggerUi.serve
