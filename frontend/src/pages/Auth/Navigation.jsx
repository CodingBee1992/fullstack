import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { useLogoutMutation } from '../../redux/api/apiSlice'
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'
import { MdOutlineLocalMovies } from 'react-icons/md'
import { toast } from 'react-toastify'
import { logout } from '../../redux/features/auth/authSlice'
const Navigation = () => {
	const { userInfo } = useSelector(state => state.auth)
	const [dropDownOpen, setDropDownOpen] = useState(false)

	const toggleDropDown = () => {
		setDropDownOpen(!dropDownOpen)
	}

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [logoutApiCall] = useLogoutMutation()

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap()
			dispatch(logout())
			navigate('/fullstack/login')
			toast.success('User successfully Loged Out')
		} catch (error) {
			toast.error(error)
		}
	}
	return (
		<div className="fixed flex items-center justify-center w-full bottom-0 rounded z-50">
			<section className="flex justify-between items-center min-w-[30%] p-3 bg-[#0f0f0f] border-2 border-teal-500">
				{/* Section 1 */}
				<div className="flex justify-around items-center w-full ">
					<Link
						to="/fullstack/"
						onMouseEnter={toggleDropDown}
						onMouseLeave={toggleDropDown}
						className="flex flex-col items-center gap-2 text-white  ">
						<span className={`${dropDownOpen ? 'visible' : 'hidden'} nav-item-name`}>Home</span>
						<AiOutlineHome className="mr-2 " size={26} />
					</Link>
					<Link
						to="/fullstack/movies"
						onMouseEnter={toggleDropDown}
						onMouseLeave={toggleDropDown}
						className="flex flex-col items-center jusify-center gap-2 text-white ">
						<span className={`${dropDownOpen ? 'visible' : 'hidden'}`}>Shop</span>
						<MdOutlineLocalMovies className="mr-2" size={26} />
					</Link>
				</div>
				{/* Section 2 */}
				<div className="relative flex justify-center items-center w-full ">
					<button onClick={toggleDropDown} className="text-gray-800 focus:outline-none">
						{userInfo ? <span className="text-white">{userInfo.username}</span> : <div></div>}

						{userInfo && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={`h-4 w-4 ml-1 ${dropDownOpen ? 'transform rotate-180' : ''}`}
								fill="none"
								viewBox="0 0 24 24"
								stroke="white">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d={dropDownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
								/>
							</svg>
						)}
					</button>

					{dropDownOpen && userInfo && (
						<ul
							className={`absolute right-0 mt-2 mr-14 w-[10rem] space-y-2 bg-white text-gray-600 ${
								!userInfo.isAdmin ? '-top-20' : '-top-24'
							}`}>
							{userInfo.isAdmin && (
								<>
									<li>
										<Link to="/fullstack/admin/movie/dashboard" className="block px-4 py-2 hover:bg-gray-100">
											Dashboard
										</Link>
									</li>
								</>
							)}

							<li>
								<Link to="/fullstack/profile" className="block px-4 py-2 hover:bg-gray-100">
									Profile
								</Link>
							</li>
							<li>
								<button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
									Logout
								</button>
							</li>
						</ul>
					)}

					{!userInfo && (
						<ul className="flex justify-center items-center gap-2">
							<li>
								<Link
									to="/fullstack/login"
									onMouseEnter={toggleDropDown}
									onMouseLeave={toggleDropDown}
									className="flex flex-col justify-center items-center gap-2 text-white transition-transform transform hover:translate-x-2 ">
									<span className={`${dropDownOpen ? 'visible' : 'hidden'}`}>LOGIN</span>
									<AiOutlineLogin size={26} />
								</Link>
							</li>

							<li>
								<Link
									to="/fullstack/register"
									onMouseEnter={toggleDropDown}
									onMouseLeave={toggleDropDown}
									className="flex flex-col justify-center items-center gap-2  text-white transition-transform transform hover:translate-x-2 ml-[1rem]">
									<span className={`${dropDownOpen ? 'visible' : 'hidden'}`}>REGISTER</span>
									<AiOutlineUserAdd size={26} />
								</Link>
							</li>
						</ul>
					)}
				</div>
			</section>
		</div>
	)
}

export default Navigation
