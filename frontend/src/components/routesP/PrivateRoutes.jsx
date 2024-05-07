import React from 'react'

import { Outlet, Navigate } from 'react-router-dom'
import UseAuth from './UseAuth'

const PrivateRoutes = () => {
    const token = UseAuth()
    return token ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
