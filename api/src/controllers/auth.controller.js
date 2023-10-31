import httpStatus from 'http-status'

import { asyncWrapper } from '../errors/async-wrapper.js'
import User from '../models/user.model.js'
import sendAccessToken from '../utils/send-access-token.js'

export const signup = asyncWrapper(async (req, res, next) => {
  const { name, username, email, password } = req.body

  const user = new User({ name, username, email, password })

  await user.save()

  const token = user.generateAccessToken()

  sendAccessToken(res, token, httpStatus.CREATED)
})
