const dotenv = require('dotenv')
const mongoose = require('mongoose')

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
    console.log('Database connection successful 😍')
  })

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`App is running on port: ${port}`)
})
