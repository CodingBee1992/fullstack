import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import { users } from './data/data.js'
import User from './models/User.js'

// Configuration
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// ROUTES
app.use('/api/v1/users', userRoutes)

const PORT = process.env.PORT || 9000

connectDB()
	.then(async () => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

		// ADD DATA ONLY ONE TIME
		// await mongoose.connection.db.dropDatabase()
		// User.insertMany(users)
	})
	.catch(error => console.log(`${error}`))
