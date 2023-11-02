import { Router } from 'express'

import { isAuthenticated } from '../middlewares/auth.js'
import {
  getUserDetails,
  signin,
  signout,
  signup,
} from '../controllers/auth.controller.js'

const router = Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/signout', signout)
router.get('/get-user-details/:id', isAuthenticated, getUserDetails)

export default router
