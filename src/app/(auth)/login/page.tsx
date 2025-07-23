"use client"
import React, {useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'


function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const authInfo = useAuth();

    async function handelSubmition(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        await authInfo?.signInWithEmailPassword(email, password,'/dashboard' )
    }

    async function loginWithGoogle() {
        await authInfo?.signinWithGoogle('/dashboard')
    }

    return (
        <Card className="w-7xl max-w-sm">
            <CardHeader>
                <CardTitle> Login</CardTitle>
                <CardAction>
                    <Link href={'/signup'}> <Button variant="link">Create Account</Button></Link>
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