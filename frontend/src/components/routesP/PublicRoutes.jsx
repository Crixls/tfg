import { Outlet, Navigate } from 'react-router-dom'
import UseAuth from './UseAuth'

const PublicRoutes = () => {
    const token = UseAuth()
    return token ? <Navigate to='/' /> : <Outlet />
}

export default PublicRoutes
