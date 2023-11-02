import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'

import { asyncWrapper } from '../errors/async-wrapper.js'
import { createCustomError } from '../errors/custom-error.js'

const isAuthenticated = asyncWrapper(async (req, res, next) => {
  const accessToken = req.cookies['access-token']

  if (!accessToken) {
    return createCustomError(
      httpStatus.UNAUTHORIZED,
      'Invalid token! Try again.'
    )
  }

  const { id: userId } = jwt.verify(accessToken, process.env.JWT_SECRET)
  req.userId = userId

  next()
})

export { isAuthenticated }
