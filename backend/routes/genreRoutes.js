import express from 'express'

// Controllers

// Middlewares
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'
import { createGenre,removeGenre,updateGenre,listGenres,readGenre } from '../controllers/genreControllers.js'

const router = express.Router()

router.route('/').post(authenticate, authorizeAdmin, createGenre)
router.route('/:id').put(authenticate,authorizeAdmin,updateGenre)
router.route('/:id').delete(authenticate,authorizeAdmin,removeGenre)
router.route('/genres').get(listGenres)
router.route('/:id').get(readGenre)
export default router
