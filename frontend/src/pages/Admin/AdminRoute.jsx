import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"



const AdminRoute = () => {

  const {userInfo} = useSelector(state => state.auth)

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ):(
    <Navigate  to='/fullstack/login' replace/>
  )

  
}

export default AdminRoute