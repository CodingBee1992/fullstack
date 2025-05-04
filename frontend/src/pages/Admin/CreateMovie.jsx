import { useNavigate } from 'react-router'
import { useCreateMovieMutation, useFetchGenresQuery, useUploadImageMutation } from '../../redux/api/apiSlice'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

const CreateMovie = () => {
	const navigate = useNavigate()

	const [movieData, setMovieData] = useState({
		name: '',
		year: 0,
		detail: '',
		cast: [],
		rating: 0,
		image: null,
		genre: '',
	})

	const [selectedImage, setSelectedImage] = useState(null)
	const [createMovie, { isLoading: isCreatingMovie, error: createMovieErrorDetail }] = useCreateMovieMutation()

	const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation()

	const { data: genres, isLoading: isLoadingGenre } = useFetchGenresQuery()

	useEffect(() => {
		if (genres) {
			setMovieData(prevData => ({
				...prevData,
				genre: genres[0]?.id || '',
			}))
		}
	}, [genres])
	return (
		<div className="container flex justify-center items-center mt-4">
			<form>
				<p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>

				<div className="mb-4">
					<label className="block">
						Name:
						<input
							type="text"
							name="name"
							value={movieData.name}
							// onChange={handleChange}
							className="px-2 py-1 w-full bg-gray-200 focus:outline-none"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label className="block">
						Year:
						<input
							type="text"
							name="year"
							value={movieData.year}
							// onChange={handleChange}
							className="px-2 py-1 w-full bg-gray-200 focus:outline-none"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label className="block">
						Details:
						<textarea
							name="detail"
							value={movieData.detail}
							// onChange={handleChange}
							className="w-full px-2 py-1 bg-gray-200 focus:outline-none"></textarea>
					</label>
				</div>
				<div className="mb-4">
					<label className="block">
						Cast (coma-separated):
						<input
							type="text"
							name="cast"
							value={movieData.cast.join(', ')}
							onChange={e => setMovieData({ ...movieData, cast: e.target.value.split(', ') })}
							className="px-2 py-1 w-full bg-gray-200 focus:outline-none"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label className="block">
						Genre:
						<select
							name="genre"
							value={movieData.genre}
							// onChange={handleChange}
							className="w-full px-2 py-1 bg-gray-200 text-teal-600">
							{isLoadingGenre ? (
								<option>Loading genres...</option>
							) : (
								genres.map(genre => (
									<option key={genre._id} value={genre.id}>
										{genre.name}
									</option>
								))
							)}
						</select>
					</label>
				</div>

				<div className="mb-4">
					<label
						style={
							!selectedImage
								? { border: '1px solid #888', borderRadius: '5px', paddingInline:"11px",paddingBlock:"8px" }
								: { border: '0', borderRadius: '0', padding: '0' }
						}>
						{!selectedImage && 'Upload Image'}
						<input
							type="file"
							accept="imgae/*"
							// onChange={handleImageChange}
							style={{ display: !selectedImage ? 'none' : 'block' }}
						/>
					</label>
				</div>

				<button
					type="button"
					// onClick={handleCreateMovie}
					className="px-4 py-2 bg-teal-500 text-white rounded"
					disabled={isCreatingMovie || isUploadingImage}>
					{isCreatingMovie && isUploadingImage ? 'Creating...' : 'Create Movie'}
				</button>
			</form>
		</div>
	)
}

export default CreateMovie
