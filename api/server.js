import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app.js'
import connectDB from './src/utils/db.config.js'

dotenv.config()

// connect to database
connectDB()

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`)
})
