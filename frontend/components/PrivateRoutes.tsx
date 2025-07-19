import { Navigate, Outlet } from 'react-router-dom'
export const PrivateRoutes = () => {
    let auth = localStorage.getItem("token")
    return (
        auth ? <Outlet /> : <Navigate to='/signin' />
    )
}