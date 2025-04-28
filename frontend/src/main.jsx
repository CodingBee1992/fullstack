import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.jsx'
import Login from './pages/Auth/Login.jsx'
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route path="/fullstack/" element={<App />}>
						<Route index element={<Home/>}/>
					</Route>
					<Route path='/fullstack/login' element={<Login/>}/>
				</Routes>
			</Provider>
		</BrowserRouter>
	</StrictMode>
)
