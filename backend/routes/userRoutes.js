import express from 'express'
import User from '../models/User.js'
// controllers
import { creatUser, loginUser, logoutCurrentUser, getAllUsers,getCurrentUserProfile,updateCurrentUserProfile } from '../controllers/userController.js'
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(creatUser)

router.post('/auth', loginUser)
router.post('/logout', logoutCurrentUser)
router.route('/profile').get(authenticate,getCurrentUserProfile).put(authenticate,updateCurrentUserProfile)

export default router
