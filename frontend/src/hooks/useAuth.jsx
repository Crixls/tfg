import React, { useContext } from 'react'
import AuthContext2 from '../context/AuthProvider2'

const useAuth = () => {
  return useContext(AuthContext2)
}

export default useAuth
