import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { useLoginMutation } from '../../redux/api/apiSlice'
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'
import { MdOutlineLocalMovies } from 'react-icons/md'
const Navigation = () => {
	const { userInfo } = useSelector(state => state.auth)
	const [dropDownOpen, setDropDownOpen] = useState(false)

	const toggleDropDown = () => {
		setDropDownOpen(!dropDownOpen)
	}

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [logoutApiCall] = useLoginMutation()

	return (
		<div className="fixed bottom-10 left-[30rem] transform translate-x-1/2 translate-y-1/2 z-50 bg-[#0f0f0f] border w-[30%] p-2 mb-[2rem] rounded">
			<section className="flex justify-between items-center">
				{/* Section 1 */}
				<div className="flex justify-around items-center w-full ">
					<Link to="/fullstack/" className="flex flex-col items-center gap-2 text-white ">
						<span className={`${dropDownOpen ? 'visible' : 'hidden'} nav-item-name`}>Home</span>
						<AiOutlineHome onMouseEnter={toggleDropDown} onMouseLeave={toggleDropDown} className="mr-2 " size={26} />
					</Link>
					<Link to="/fullstack/movies" className="flex flex-col items-center jusify-center gap-2 text-white ">
						<span className={`${dropDownOpen ? 'visible' : 'hidden'}`}>Shop</span>
						<MdOutlineLocalMovies
							onMouseEnter={toggleDropDown}
							onMouseLeave={toggleDropDown}
							className="mr-2"
							size={26}
						/>
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
									className="flex flex-col justify-center items-center gap-2 text-white transition-transform transform hover:translate-x-2 ">
									<span className={`${dropDownOpen ? 'visible' : 'hidden'}`}>LOGIN</span>
									<AiOutlineLogin
										onMouseEnter={toggleDropDown}
										onMouseLeave={toggleDropDown}
										
										size={26}
									/>
								</Link>
							</li>

							<li>
								<Link
									to="/fullstack/register"
									className="flex flex-col justify-center items-center gap-2  text-white transition-transform transform hover:translate-x-2 ml-[1rem]">
									<span className={`${dropDownOpen ? 'visible' : 'hidden'}`}>REGISTER</span>
									<AiOutlineUserAdd onMouseEnter={toggleDropDown} onMouseLeave={toggleDropDown} size={26} />
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
