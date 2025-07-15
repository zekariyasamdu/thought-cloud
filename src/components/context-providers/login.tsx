"use client"
import React, { createContext, useState } from 'react'

interface ILogin {
    loggedIn: boolean,
    setLoggedin: React.Dispatch<React.SetStateAction<boolean>>,
}

const Login = createContext<ILogin>({
    loggedIn:  false,
    setLoggedin:  () => {}
})

function LoginProvider({children} : {children: React.ReactNode}) {
    const [loggedIn, setLoggedin] = useState(false)
    return (
        <Login.Provider value={{ loggedIn, setLoggedin }}>
            {children}
        </Login.Provider>
    )
}

export default LoginProvider