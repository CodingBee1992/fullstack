import { useEffect, useState } from 'react'
import { useProfileMutation } from '../../redux/api/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/auth/authSlice'

const Profile = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const { userInfo } = useSelector(state => state.auth)

	const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

	useEffect(() => {
		setUsername(userInfo.username)
		setEmail(userInfo.email)
	}, [userInfo.email, userInfo.username])

	const dispatch = useDispatch()

	const submitHandler = async e => {
		e.preventDefault()

		if (password !== confirmPassword) {
			toast.error('Password do not match')
		} else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					username,
					email,
					password,
				}).unwrap()

				dispatch(setCredentials({ ...res }))
				toast.success('Profile successfully updated')
			} catch (err) {
        console.log(err);
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	return (
		<div>
			<div className="container mx-auto p-4 mt-[10rem]">
				<div className="flex justify-center align-center md:flex md:space-x-4">
					<div className="md:w-[30%]">
						<h2 className="mb-4 text-2xl font-semibold">Update Profile</h2>

						<form onSubmit={submitHandler}>
							<div className="mb-4">
								<label className="block text-white mb-2">Name</label>
								<input
									type="text"
									placeholder="Enter name"
									className="w-full p-4 bg-gray-200 rounded-sm "
									value={username}
									onChange={e => setUsername(e.target.value)}
								/>
							</div>
							<div className="mb-4">
								<label className="block text-white mb-2">Email</label>
								<input
									type="email"
									placeholder="Enter email"
									className="w-full p-4 bg-gray-200 rounded-sm "
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-4">
								<label className="block text-white mb-2">Password</label>
								<input
									type="password"
									placeholder="Enter password"
									className="w-full p-4 bg-gray-200 rounded-sm "
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							<div className="mb-4">
								<label className="block text-white mb-2">Confirm password</label>
								<input
									type="password"
									placeholder="Confirm password"
									className="w-full p-4 bg-gray-200 rounded-sm "
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.target.value)}
								/>
							</div>
							<button
								type="submit"
								className="w-full mt-2 px-4 py-2 text-white bg-teal-500 font-semibold rounded cursor-pointer hover:bg-teal-700 duration-400">
								Update
							</button>
							{loadingUpdateProfile && <Loader />}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
