import { asyncWrapper } from '../errors/async-wrapper.js'

export const signUp = asyncWrapper((req, res, next) => {
  console.log(req.body)
  res.json(req.body)
})
