const passport = require('passport')
const createHttpError = require('http-errors')

export const auth =
  (...roles) =>
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || info || !user) {
        const message =
          info?.name == 'TokenExpiredError'
            ? 'Token has expired, please try again.'
            : 'Please authenticate.'
        return next(new createHttpError.Unauthorized(message))
      }

      req.user = user

      if (roles.length > 0 && !roles.includes(req.user.role)) {
        return next(
          createHttpError.Forbidden(
            `User role ${req.user.role} is not authorized to access this route`
          )
        )
      }
      next()
    })(req, res, next)
  }
