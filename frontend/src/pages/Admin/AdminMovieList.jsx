import { Link } from 'react-router'
import { useGetAllMoviesQuery } from '../../redux/api/apiSlice'

const AdminMovieList = () => {
	const { data: movies } = useGetAllMoviesQuery()

	return (
		<div className="mx-[9rem]">
			<div className="flex flex-col md:flex-row">
				<div className="p-3">
					<div className="ml-[2rem] text-xl font-semibold h-12">All Movies ({movies?.length})</div>
					<div className="flex flex-wrap justify-around items-center gap-3 p-5">
						{movies?.map(movie => (
							<div
								key={movie._id}
								// to={`/fullstack/admin/movies/update/${movie._id}`}
								className="block mb-4 bg-teal-950 overflow-hidden">
								<div className="flex">
									<div key={movie._id} className="max-w-sm p-4 rounded overflow-hidden shadow-lg">
										<img src={movie.image} alt={movie.name} className="w-full h-48 object-cover" />
										<div className="mt-5 px-6 py-2 border border-teal-500">
											<div className="font-semibold text-xl">{movie.name}</div>
										</div>
                                        <p className='mt-5 text-base text-gray-300'>{movie.detail}</p>
                                        <div className='mt-6 '>
                                            <Link  to={`/fullstack/admin/movies/update/${movie._id}`} className='py-2 px-4 text-white font-semibold rounded bg-teal-400 hover:bg-teal-700'>Update Movie</Link>
                                        </div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminMovieList
