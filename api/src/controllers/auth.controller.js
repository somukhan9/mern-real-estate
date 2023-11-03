import httpStatus from 'http-status'
import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'
import sendAccessToken from '../utils/send-access-token.js'
import { asyncWrapper } from '../errors/async-wrapper.js'
import { createCustomError } from '../errors/custom-error.js'

export const signup = asyncWrapper(async (req, res, next) => {
  const { name, username, email, password } = req.body

  const user = new User({ name, username, email, password })

  await user.save()

  sendAccessToken(res, user, httpStatus.CREATED)
})

export const signin = asyncWrapper(async (req, res, next) => {
  const { emailOrUsername, password } = req.body

  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  })

  if (!user) {
    return next(
      createCustomError(httpStatus.BAD_REQUEST, 'Invalid credentials!')
    )
  }

  // const comparePassword = await user.comparePassword(password)
  const comparePassword = await bcrypt.compare(password, user.password)

  if (!comparePassword) {
    return next(
      createCustomError(httpStatus.BAD_REQUEST, 'Invalid credentials!')
    )
  }

  sendAccessToken(res, user, httpStatus.OK)
})

export const signout = asyncWrapper((req, res) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
  }

  res.cookie('access-token', null, options)
  req.user = null

  res.status(httpStatus.OK).json({ success: true, message: 'Logged Out!' })
})

export const getUserDetails = asyncWrapper(async (req, res, next) => {
  const { userId } = req
  const user = await User.findById(userId).select('-password')

  if (!user) {
    return next(createCustomError(httpStatus.NOT_FOUND, 'User not found!'))
  }

  res.status(httpStatus.OK).json({ success: true, user })
})
