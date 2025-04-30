import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast, ToastContainer } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/apiSlice'
const Register = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [register, { isLoading }] = useRegisterMutation()

	const { userInfo } = useSelector(state => state.auth)
	const { search } = useLocation()
	const sp = new URLSearchParams(search)
	const redirect = sp.get('redirect') || '/fullstack/'

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [navigate, redirect, userInfo])

	const submitHandler = async e => {
		e.preventDefault()

		if (password !== confirmPassword) {
			toast.error('Password do not match')
		} else {
			try {
				const res = await register({ username, email, password }).unwrap()
				dispatch(setCredentials({ ...res }))

				toast.success('User successfully registered')
				navigate(redirect)
			} catch (error) {
				console.log(error)
				toast.error(`${error.data}`)
			}
		}
	}

	return (
		<div className="flex flex-wrap pl-[10rem]">
			<div className="mr-[4rem] mt-[5rem]">
				<h1 className="text-2xl font-semibold mb-4">Register</h1>

				<form onSubmit={submitHandler} className="container w-[40rem]">
					<div className="my-[2rem]">
						<label htmlFor="name" className="block text-sm font-medium text-white">
							Name
						</label>
						<input
							type="text"
							id="name"
							className="mt-1 p-2 border bg-gray-200 rounded w-full"
							placeholder="Enter Name"
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<div className="my-[2rem]">
						<label htmlFor="email" className="block text-sm font-medium text-white">
							Email
						</label>
						<input
							type="email"
							id="email"
							className="mt-1 p-2 bg-gray-200 border rounded w-full"
							placeholder="Enter email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className="my-[2rem]">
						<label htmlFor="password" className="block text-sm font-medium text-white">
							Password
						</label>
						<input
							type="password"
							id="password"
							className="mt-1 p-2 bg-gray-200 border rounded w-full"
							placeholder="Enter Password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className="my-[2rem]">
						<label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							className="mt-1 p-2 bg-gray-200 border rounded w-full"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="px-4 py-2 rounded my-1 bg-teal-500 text-white cursor-pointer"
						disabled={isLoading}>
						{isLoading ? 'Registering...' : 'Register'}
					</button>

					{isLoading && <Loader />}
				</form>
				<div className="mt-4">
					<p className="text-white">
						Already have an account?{' '}
						<Link
							to={redirect ? `/fullstack/login?redirect=${redirect}` : '/fullstack/login'}
							className="text-teal-500 hover:underline">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Register
