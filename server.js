const dotenv = require('dotenv')
const mongoose = require('mongoose')

process.on('uncaughtException', (err) => {
  console.log(`${err.name}: ${err.message}`)
  console.log('Uncaught Exception! 💥 Shutting down...')
  process.exit(1)
})

dotenv.config({
  path: './config.env',
})
const app = require('./app')

mongoose
  .connect(process.env.DATABASE_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful 🚀')
  })

const port = process.env.PORT || 8000
const server = app.listen(port, () => {
  console.log(`App is running on port: ${port}`)
})

process.on('unhandledRejection', (err) => {
  console.log(`${err.name}: ${err.message}`)
  console.log('Unhandled Rejection! 💥 Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})
