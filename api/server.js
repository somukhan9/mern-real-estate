import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app.js'
import connectDB from './src/utils/db.config.js'

dotenv.config()

// connect to database
connectDB().catch((err) => console.log(err))

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('DB connected successfully!')
  })
  .catch((error) => {
    console.log(error)
  })

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`)
})
