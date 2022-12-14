import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/error.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`))

app.use(notFound)

app.use(errorHandler)