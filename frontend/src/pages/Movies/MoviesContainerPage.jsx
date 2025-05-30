import { useState } from 'react'
import {
	useFetchGenresQuery,
	useGetNewMoviesQuery,
	useGetRandomMoviesQuery,
	useGetTopMoviesQuery,
} from '../../redux/api/apiSlice'
import SliderUtil from '../../components/SliderUtil'

const MoviesContainerPage = () => {
	const { data } = useGetNewMoviesQuery()
	const { data: topMovies } = useGetTopMoviesQuery()
	const { data: genres } = useFetchGenresQuery()
	const { data: randomMovies } = useGetRandomMoviesQuery()

	const [selectedGenre, setSelectedGenre] = useState(null)

	const handleGenreClick = genreId => {
		setSelectedGenre(genreId)
	}

	const filteredMovies = data?.filter(movie => selectedGenre === null || movie.genre === selectedGenre)

	return (
		<div className="flex flex-col lg:flex-row lg:justify-between items-center">
			<nav className="flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row ml-6 ">
				{genres?.map(g => (
					<button
						key={g._id}
						className={`block p-2 mb-2 text-lg rounded hover:bg-gray-200 duration-400 ${
							selectedGenre === g._id ? 'bg-gray-200' : ''
						}`}
						onClick={() => handleGenreClick(g._id)}>
						{g.name}
					</button>
				))}
			</nav>

			<section className="flex flex-col justify-center items-center w-full lg:w-auto">
				<div className="w-full lg:w-[100rem] mb-8">
					<h1 className="mb-5">Choose for you</h1>
					<SliderUtil data={randomMovies} />
				</div>

				<div className="w-full lg:w-[100rem] mb-8">
					<h1 className="mb-5">Top Movies</h1>
					<SliderUtil data={topMovies} />
				</div>
				<div className="w-full lg:w-[100rem] mb-8">
					<h1 className="mb-5">Choose Movies</h1>
					<SliderUtil data={filteredMovies} />
				</div>
			</section>
		</div>
	)
}

export default MoviesContainerPage
