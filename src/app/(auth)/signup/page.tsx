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
import { useAuth } from '@/hooks/use-auth'

function SignUpPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [reEnterPassword, setReEnterPassword] = useState("")
    const authInfo = useAuth();

    async function handelSubmition(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (password === reEnterPassword) {
            await authInfo.createUserWithEmailPassword(email, password, 'login');
        }
    }
    
    async function signInWithGoogle() {
        await authInfo?.signinWithGoogle('/dashboard')
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
                            Create Account
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