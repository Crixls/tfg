import React from 'react'

const UseAuth = () => {
    const user = localStorage.getItem('UserToken')
    //checking whether token is preset or not
    if (user) {
        return true;
    } else {
        return false
    }
}

export default UseAuth
