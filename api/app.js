import express from 'express'
import cookieParser from 'cookie-parser'

import authRouter from './src/routes/auth.route.js'
import errorHandlerMiddleware from './src/middlewares/error.js'

const app = express()

// Necessary Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Routes
app.use('/api/v1/auth', authRouter)

// Error Handler Middleware
app.use(errorHandlerMiddleware)

export default app
