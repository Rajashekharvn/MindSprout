"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import type { SignupResponse } from "@/types/auth"

export function SignupForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await api.post<SignupResponse>("/signup", formData)
            toast.success("Account created! Please check your email for OTP.")
            // Redirect to verify page with email
            router.push(`/verify?email=${encodeURIComponent(formData.email)}`)
        } catch (error: any) {
            console.error("Signup Error:", error);
            const errorMessage = error.response?.data?.error || error.message || "Signup failed";
            toast.error(`Error: ${errorMessage}`);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="******" value={formData.password} onChange={handleChange} required />
                        </div>
                        <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Sign Up"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
