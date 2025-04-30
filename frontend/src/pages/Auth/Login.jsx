import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast, ToastContainer } from 'react-toastify'
import { useLoginMutation } from '../../redux/api/apiSlice'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [login, { isLoading }] = useLoginMutation()

	const { userInfo } = useSelector(state => state.auth)

	const { search } = useLocation()
	const sp = new URLSearchParams(search)
	const redirect = sp.get('redirect') || '/fullstack/'

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [navigate, redirect, userInfo])

  const submitHandler = async(e)=>{
    e.preventDefault()


    try {
       const res = await login({email,password}).unwrap()

       dispatch(setCredentials({...res}))
       navigate(redirect)
       toast.success("User successfully Loged In")

    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

	return (
		<div>
			<section className="flex flex-wrap pl-[10rem]">
				<div className="mr-[4rem] mt-[5rem]">
					<h1 className="mb-4 text-2xl font-semibold">Sign In</h1>

					<form onSubmit={submitHandler} className="container w-[40rem]">
						<div className="my-[2rem]">
							<label htmlFor="email" className="block text-white text-sm font-medium ">
								Email Address
							</label>
              <input onChange={(e)=> setEmail(e.target.value)} type="email" id='email' value={email}  className='mt-1 p-2 bg-gray-200 border rounded w-full' placeholder='Enter Email'   />
						</div>
						<div className="my-[2rem]">
							<label htmlFor="password" className="block text-white text-sm font-medium ">
								Password
							</label>
              <input onChange={(e)=> setPassword(e.target.value)} type="password" id='password' value={password}  className='mt-1 p-2 bg-gray-200 border rounded w-full' placeholder='Enter Password'   />
						</div>

            <button disabled={isLoading} type='submit' className='px-4 py-2 rounded my-1 bg-teal-500 text-white cursor-pointer'>{isLoading ? "Signing In ...": "Sign In"}</button>
            {isLoading && <Loader/>}
					</form>

          <div className='mt-4'>
            <p className='text-white'>
              New Customer? {" "}
              <Link to={redirect ? `/fullstack/register?redirect=${redirect}`:"/fullstack/register"} className='text-teal-500 hover:underline'>Register</Link>
            </p>
          </div>
				</div>
			</section>
		</div>
	)
}

export default Login
