import React from 'react'

const UseAuth = () => {
    const user = localStorage.getItem('UserToken')
    if (user) {
        return true;
    } else {
        return false
    }
}

export default UseAuth
