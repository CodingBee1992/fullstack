import { useState } from 'react'
import {
	useCreateGenreMutation,
	useDeleteGenreMutation,
	useFetchGenresQuery,
	useUpdateGenreMutation,
} from '../../redux/api/apiSlice'
import { toast } from 'react-toastify'
import GenreForm from '../../components/GenreForm'
import Modal from '../../components/Modal'

const GenreList = () => {
	const { data: genres, refetch } = useFetchGenresQuery()
	const [name, setName] = useState('')
	const [selectedGenre, setSelectedGenre] = useState(null)
	const [updatingName, setUpdatingName] = useState('')
	const [modalVisible, setModalVisible] = useState(false)

	const [createGenre] = useCreateGenreMutation()
	const [updateGenre] = useUpdateGenreMutation()
	const [deleteGenre] = useDeleteGenreMutation()
	console.log(selectedGenre)
	const handleCreateGenre = async e => {
		e.preventDefault()

		if (!name) {
			toast.error('Genre name required')
			return
		}

		try {
			const res = await createGenre({ name }).unwrap()

			if (res.error) {
				toast.error(res.error)
			} else {
				setName('')
				toast.success(`${res.name} is created`)
				refetch()
			}
		} catch (error) {
			console.error(error)
			toast.error('Creating genre failed, try again')
		}
	}

	const handleUpdateGender = async e => {
		e.preventDefault()

		if (!updateGenre) {
			toast.error('Genre name is required')
			return
		}

		if (selectedGenre) {
			try {
				const res = await updateGenre({
					id: selectedGenre._id,

					updatedGenre: {
						name: updatingName,
					},
				}).unwrap()

				if (res.error) {
					toast.error(res.error)
				} else {
					toast.success(`${res.name} is updated`)
					refetch()

					setSelectedGenre(null)
					setUpdatingName('')
					setModalVisible(false)
				}
			} catch (error) {
				console.error(error)
			}
		}
	}

	const handleDeleteGenre = async e => {
		e.preventDefault()

		try {
			const res = await deleteGenre(selectedGenre._id).unwrap()

			if (res.error) {
				toast.error(res.error)
			} else {
				toast.success(`${res.name} has successfully deleted`)
				refetch()

				setSelectedGenre(null)
				setUpdatingName('')
				setModalVisible(false)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="flex flex-col md:flex-row ml-10">
			<div className="md:w-[75%] p-3">
				<h1 className="h-12">Manage Genres</h1>

				<GenreForm value={name} setValue={setName} handleSubmit={handleCreateGenre} />

				<br />

				<div className="flex flex-wrap">
					{genres?.map(genre => (
						<div key={genre._id}>
							<button
								onClick={() => {
									setModalVisible(true)
									setSelectedGenre(genre)
									setUpdatingName(genre.name)
								}}
								className="m-3 px-4 py-2 bg-white text-teal-500 border-teal-500 rounded-lg hover:bg-teal-500 hover:text-white duration-400">
								{genre.name}
							</button>
						</div>
					))}
				</div>
				<Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
					<GenreForm
						value={updatingName}
						setValue={value => setUpdatingName(value)}
						handleSubmit={handleUpdateGender}
						buttonText="Update"
						handleDelete={handleDeleteGenre}
					/>
				</Modal>
			</div>
		</div>
	)
}

export default GenreList
