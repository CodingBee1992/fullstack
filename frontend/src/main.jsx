import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.jsx'
import Movies from './pages/User/Movies.jsx'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './pages/Auth/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import GenreList from './pages/Admin/GenreList.jsx'
import CreateMovie from './pages/Admin/CreateMovie.jsx'
import AdminMovieList from './pages/Admin/AdminMovieList.jsx'
import UpdateMovie from './pages/Admin/UpdateMovie.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<ToastContainer />
			<Provider store={store}>
				<Routes>
					<Route path="/fullstack/" element={<App />}>
						<Route index element={<Home />} />
						<Route path="movies" element={<Movies />} />
						<Route path="" element={<PrivateRoute />} >
						<Route path='profile' element={<Profile/>}/>
						</Route>
						<Route path='admin' element={<AdminRoute />}>
							<Route path='movies/genre' element={<GenreList/>}/>
							<Route path='movies/create' element={<CreateMovie/>}/>
							<Route path='movies-list' element={<AdminMovieList/>}/>
							<Route path='movies/update/:id' element={<UpdateMovie/>}/>
						</Route>
					</Route>
					<Route path="/fullstack/login" element={<Login />} />
					<Route path="/fullstack/register" element={<Register />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	</StrictMode>
)
