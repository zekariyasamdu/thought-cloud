"use client"
import { Login } from '@/context/login'
import React, { useState } from 'react'

function LoginProvider({children} : {children: React.ReactNode}) {
    const [loggedIn, setLoggedin] = useState(false)
    return (
        <Login.Provider value={{ loggedIn, setLoggedin }}>
            {children}
        </Login.Provider>
    )
}

export default LoginProvider