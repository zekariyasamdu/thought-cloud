"use client"
import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../firebase'
import { useRouter } from 'next/navigation'

function Signout() {
    const route = useRouter()
    async function clickHandler() {
        try {
            await signOut(auth)
            route.push("/auth/login")
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <span
            className="cursor-pointer"
            onClick={clickHandler}>Signout</span>
    )
}

export default Signout