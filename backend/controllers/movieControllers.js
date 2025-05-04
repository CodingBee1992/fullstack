import asyncHandler from "../middlewares/asyncHandler.js";
import Movies from "../models/Movie.js";


const createMovie = asyncHandler(async (req,res) => {
    try {
        const newMovie = new Movies(req.body)
        const savedMovie = await newMovie.save()

        res.json(savedMovie)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

export {createMovie}