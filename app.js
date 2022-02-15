const express = require('express')
const morgan = require('morgan')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// body parser middleware
app.use(express.json())

console.log(process.env.NODE_ENV)
// static files
app.use(express.static(`${__dirname}/public`))

// Route middleware
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// ERROR HANDLING MIDDLEWARE (GLOBAL)
app.use(globalErrorHandler)

module.exports = app
