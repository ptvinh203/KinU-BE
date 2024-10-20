import express from 'express'
import apiRoutes from './routes/api'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { databaseMiddleware } from './middlewares/databaseMiddleware'
import 'reflect-metadata';
import router from './routes'
import ErrorHanlder from './middlewares/errorHandler'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(express.json())

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for My API',
      contact: {
        name: 'Your Name',
        email: 'your.email@example.com'
      },
      servers: [{ url: `http://localhost:${port}` }]
    }
  },
  apis: ['./src/routes/*.ts'] // Đường dẫn tới các file có chú thích API
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//Database
app.use(databaseMiddleware);

// Routes
app.use('/api', router);
app.use(ErrorHanlder);
// app.get('/', (req, res) => {
//   res.send('Welcome to the API!')
// })


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
