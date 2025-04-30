import React from 'react'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Navigation from './pages/Auth/Navigation'

const App = () => {
	return (
		<div>
			

			<Navigation />
			<main className="py-3">
				<Outlet />
			</main>
		</div>
	)
}

export default App
