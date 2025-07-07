"use client"
import React, { useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../../../firebase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    async function handelSubmition(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            router.push('/dashboard')
        } catch (e) {
            console.error(e);
        }
    }
    async function loginWithGoogle() {
        try {
            await signInWithPopup(
                auth,
                googleProvider
            );
            router.push('/dashboard')
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Card className="w-7xl max-w-sm">
            <CardHeader>
                <CardTitle> Login</CardTitle>
                <CardAction>
                    <Link href={'/auth/signup'}> <Button variant="link">Sign Up</Button></Link>
                </CardAction>
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
                            required
                        />
                    </div>
                    <div className="flex-col gap-2">
                        <Button type="submit" className="w-full cursor-pointer" >
                            Login
                        </Button>
                        <Button variant="outline" className="w-full cursor-pointer" onClick={loginWithGoogle}>
                            Login with Google
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginPage