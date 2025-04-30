import { Outlet,Navigate } from 'react-router'
import { useSelector } from 'react-redux'
const PrivateRoute = () => {

    const {userInfo}= useSelector((state)=> state.auth)



return userInfo ? <Outlet /> : <Navigate to='/fullstack/login' replace/>
}

export default PrivateRoute