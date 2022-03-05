const fs = require('fs')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Tour = require('../../models/tourModel')

dotenv.config({
  path: './config.env',
})

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

// Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))

// Import data into db
const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data successfully loaded! 😊')
  } catch (error) {
    console.log(error)
  }
  process.exit()
}

// delete all data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data successfully deleted! 💥')
  } catch (error) {
    console.log(error)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
