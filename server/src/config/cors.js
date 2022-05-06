import cors from 'cors'
import createHttpError from 'http-errors'

const whitelist = ['http://localhost:3000']

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(
        createHttpError.Forbidden(
          "The CORS policy for this origin doesn't allow access from the particular origin."
        )
      )
    }
  },
  credentials: true,
}

export const configCors = cors(corsOptions)
