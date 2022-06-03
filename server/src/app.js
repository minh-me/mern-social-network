import express from 'express'
import path from 'path'
import morgan from 'morgan'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import httpError from 'http-errors'
import 'colors'

import { scheduleJob } from './utils/backup/scheduleJob'
import { jwtStrategy, config, db, authLimiter } from './config'
import { errorHandler } from './middleware'
import routes from './routes/_index'
import { configCors } from './config/cors'

// connect to database
db.connect()

// init app
const app = express()

// body parser
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// cookie parser
app.use(cookieParser(config.jwt.refreshSecret))

// dev logging middleware
if (config.env === 'development') {
  app.use(morgan('dev'))
}

// sanitize data
app.use(mongoSanitize())

// set security headers
app.use(helmet())

// prevent XSS attacks
app.use(xss())

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/auth', authLimiter)
}

// prevent http param pollution
app.use(hpp())

// enable CORS
app.use(configCors)

// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

// Set static folder
app.use(express.static(path.join(__dirname, 'src', 'uploads')))

// Init schedule job
scheduleJob()

// api routes
app.use('/api', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  return next(new httpError.NotFound('Not found api request'))
})

// handle error
app.use(errorHandler)

// export
export default app
