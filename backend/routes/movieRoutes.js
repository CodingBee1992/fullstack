import express from 'express'


// Controllers
import { createMovie } from '../controllers/movieControllers.js'

// Middlewares
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'
import checkId from '../middlewares/checkId.js'

const router = express.Router()

// Public routes
// router.get("/all-movies", getAllMovies)
// Restricted Routes

// Admin
router.post('/create-movie', authenticate,authorizeAdmin,createMovie)

export default router