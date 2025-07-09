"use client"
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider, noteCollections } from '../../../../firebase'
import { useRouter } from 'next/navigation'
import { addDoc } from 'firebase/firestore'
import { getCurrentUserId } from '@/lib/utils'


function SignUpPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [reEnterPassword, setReEnterPassword] = useState("")
    const router = useRouter()

    async function handelSubmition(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("here")
        if (password === reEnterPassword) {
            try {
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                await addDoc(noteCollections, {
                    id: getCurrentUserId()
                })
                router.push('/auth/login')
            } catch (e) {
                console.error(e);
            }
        }
    }
    async function signInWithGoogle() {
        try {
            await signInWithPopup(
                auth,
                googleProvider
            );
            router.push('/auth/login')
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Card className="w-7xl max-w-sm">
            <CardHeader>
                <CardTitle> Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6" onSubmit={(e) => { handelSubmition(e) }}>
                    <div className="grid gap-2">
                        <Input
                            id="email"
                            type="email"
                            placeholder="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Input
                            id="password"
                            type="password"
                            placeholder='password'
                            onChange={(e) => { setPassword(e.target.value) }}
                            required />
                    </div>
                    <div className="grid gap-2">
                        <Input
                            id="re-password"
                            type="password"
                            placeholder='re-enter password'
                            onChange={(e) => { setReEnterPassword(e.target.value) }}
                            required />
                    </div>
                    <div className="flex-col gap-2">
                        <Button
                            type="submit"
                            className="w-full cursor-pointer" >
                            Sign Up
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                            onClick={signInWithGoogle}>
                            Sign Up with Google
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignUpPage