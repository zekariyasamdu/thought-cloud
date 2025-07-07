import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
function SignUpPage() {
    return (
        <Card className="w-7xl max-w-sm">
            <CardHeader>
                <CardTitle> Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Input
                                id="email"
                                type="email"
                                placeholder="email"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Input id="password" type="password" placeholder='password' required />
                        </div>
                        <div className="grid gap-2">
                            <Input id="re-password" type="password" placeholder='re-enter password' required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full cursor-pointer">
                    Sign Up
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                    Sign Up with Google
                </Button>
            </CardFooter>
        </Card>
    )
}

export default SignUpPage