import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
	useDeleteMovieMutation,
	useGetAllMoviesQuery,
	useGetSpecificMovieQuery,
	useUpdateMovieMutation,
	useUploadImageMutation,
} from '../../redux/api/apiSlice'
import { toast } from 'react-toastify'

const UpdateMovie = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const refetch = useGetAllMoviesQuery()
	const [movieData, setMovieData] = useState({
		name: '',
		year: 0,
		detail: '',
		cast: [],
		rating: 0,
		image: null,
		
	})
	const [selectedImage, setSelectedImage] = useState(null)
	const { data: initialMovieData } = useGetSpecificMovieQuery(id)

	console.log(initialMovieData)
	useEffect(() => {
		if (initialMovieData) {
			setMovieData(initialMovieData)
		}
	}, [initialMovieData])

	const [updateMovie, { isLodaing: isUpdatingMovie }] = useUpdateMovieMutation()

	const [uploadImage, { isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation()

	const [deleteMovie] = useDeleteMovieMutation()

	const handleChange = e => {
		const { name, value } = e.target
		setMovieData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleImageChange = e => {
		const file = e.target.files[0]

		setSelectedImage(file)
	}

	const handleUpdateMovie = async () => {
		try {
			if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast) {
				toast.error('Please fill in all required fields')
				return
			}

			let uploadedImagePath = movieData.image

			if (selectedImage) {
				const formData = new FormData()

				formData.append('image', selectedImage)

				const uploadImageResponse = await uploadImage(formData)

				if (uploadImageResponse.data) {
					uploadedImagePath = uploadImageResponse.data.image
				} else {
					console.error('Failed to upload image:', uploadImageErrorDetails)
					toast.error('Failed to upload image')
					return
				}
			}

			await updateMovie({
				id: id,
				updatedMovie: {
					...movieData,
					image: uploadedImagePath,
				},
			})
			navigate('/fullstack/admin/movies-list')

			toast.success('Movie uploaded')
		} catch (error) {
			console.error('Failed to update movie:', error)
		}
	}

	const handleDeleteMovie = async () => {
		try {
			

			await deleteMovie(id)
			navigate('/fullstack/admin/movies-list')
			toast.success("Movie deleted successfully deleted")
		} catch (error) {
			console.error('Failed to delete movie:', error)
			toast.error(`Failed to delete movie: ${error?.message}`)
		}
	}

	return (
		<div className="flex justify-center items-center mt-4">
			<form>
				<p className="mb-4 text-green-200 w-[50rem] text-2xl">Update Movie</p>

				<div className="mb-4">
					<label className="block">
						Name:
						<input
							type="text"
							name="name"
							value={movieData.name}
							onChange={handleChange}
							className="w-full px-2 py-1 bg-gray-200 border focus:outline-none"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label className="block">
						Year:
						<input
							type="number"
							name="year"
							value={movieData.year}
							onChange={handleChange}
							className="w-full px-2 py-1 bg-gray-200 border focus:outline-none"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label className="block">
						Detail:
						<textarea
							type="text"
							name="detail"
							value={movieData.detail}
							onChange={handleChange}
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
					<label
						className="hover:bg-gray-700 duration-400 cursor-pointer"
						style={
							!selectedImage
								? { border: '1px solid #888', borderRadius: '5px', paddingInline: '11px', paddingBlock: '8px' }
								: { border: '0', borderRadius: '0', padding: '0' }
						}>
						{!selectedImage && 'Upload Image'}
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							style={{ display: !selectedImage ? 'none' : 'block' }}
							className="bg-gray-200"
						/>
					</label>
				</div>

				<div className="flex gap-3">
					<button
						type="button"
						onClick={handleUpdateMovie}
						className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700 duration-400 cursor-pointer"
						disabled={isUpdatingMovie || isUploadingImage}>
						{isUpdatingMovie && isUploadingImage ? 'Updating...' : 'Update Movie'}
					</button>
					<button
						type="button"
						onClick={handleDeleteMovie}
						className="px-4 py-2 bg-black text-red-600 border border-red-600 rounded hover:text-red-800 duration-400 cursor-pointer"
						disabled={isUpdatingMovie || isUploadingImage}>
						{isUpdatingMovie && isUploadingImage ? 'Deleting...' : 'Delete Movie'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default UpdateMovie
