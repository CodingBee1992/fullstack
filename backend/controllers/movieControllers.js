import asyncHandler from '../middlewares/asyncHandler.js'
import Movies from '../models/Movie.js'

const createMovie = async (req, res) => {
	try {
		const newMovie = new Movies(req.body)
		const savedMovie = await newMovie.save()

		res.json(savedMovie)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const getAllMovies = async (req, res) => {
	try {
		const movies = await Movies.find()
		res.json(movies)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const getSpecificMovie = async (req, res) => {
	try {
		const { id } = req.params
		
		const specificMovie = await Movies.findById(id)

		if (!specificMovie) {
			return res.status(404).json({ message: 'Movie not found' })
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
const updateMovie = async (req, res) => {
	try {
		const { id } = req.params
		const updatedMovie = await Movies.findByIdAndUpdate(id, req.body, { new: true })

		if (!updatedMovie) {
			return res.status(404).json({ message: 'Movie not found' })
		}

		res.json(updatedMovie)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const movieReview = async (req, res) => {
	try {
		const { rating, comment } = req.body
		const movie = await Movies.findById(req.params.id)

		if (movie) {
			const alreadyReviewed = movie.reviews.find(r => r.user.toString() === req.user._id.toString())

			if (alreadyReviewed) {
				res.status(400)
				throw new Error('Movie already reviewed')
			}

			const review = {
				name: req.user.username,
				rating: Number(rating),
				comment,
				user: req.user._id,
			}

			movie.reviews.push(review)
			movie.numReviews = movie.reviews.length
			movie.reating = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length

			await movie.save()
			res.status(201).json({ message: 'Review added' })
		} else {
			res.status(404)
			throw new Error('Movie not found')
		}
	} catch (error) {
		console.error(error)
		res.status(400).json(error.message)
	}
}

const deleteMovie = async (req, res) => {
	try {
		const { id } = req.params
		const deletedMovie = await Movies.findByIdAndDelete(id)

		if (!deletedMovie) {
			return res.status(404).json({ message: 'Movie not found' })
		}

		res.json({ message: 'Movie Deleted Successfully' })
	} catch (error) {
		console.error(error)
		res.status(500).json(error.message)
	}
}

const deleteComment = async (req, res) => {
	try {
		const { movieId, reviewId } = req.body
		const movie = await Movies.findById(movieId)

		if (!movie) {
			return res.status(404).json({ message: 'Movie not found' })
		}

		const reviewIndex = movie.reviews.findIndex(r => r._id.toString() === reviewId)

		if (reviewIndex === -1) {
			return res.status(404).json({ message: 'Comment not found' })
		}

		movie.reviews.splice(reviewIndex, 1)
		movie.numReviews = movie.reviews.length
		movie.rating =
			movie.reviews.length > 0 ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length : 0

		await movie.save()
		res.json({ message: 'Comment Deleted Successfully' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: error.message })
	}
}

const getNewMovies = async (req, res) => {
	try {
		const newMovies = await Movies.find().sort({ createdAt: -1 }).limit(10)
		res.json(newMovies)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const getTopMovies = async (req, res) => {
	try {
		const topRatedMovies = await Movies.find().sort({ numReviews: -1 }).limit(10)
		res.json(topRatedMovies)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const getRandomMovies = async (req,res) => {
	try {
		const randomMovies = await Movies.aggregate([{$sample:{size:10}}])
		res.json(randomMovies)
	} catch (error) {
		res.status(500).json({error:error.message})
	}
}

export {
	createMovie,
	getAllMovies,
	getSpecificMovie,
	updateMovie,
	movieReview,
	deleteMovie,
	deleteComment,
	getNewMovies,
	getTopMovies,
	getRandomMovies
}
