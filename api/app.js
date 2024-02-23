import express from 'express'
import cookieParser from 'cookie-parser'

import authRouter from './src/routes/auth.route'
import errorHandlerMiddleware from './src/middlewares/error'

const app = express()

// Necessary Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

// Routes
app.use('/api/v1/auth', authRouter)

// Error Handler Middleware
app.use(errorHandlerMiddleware)

export default app
