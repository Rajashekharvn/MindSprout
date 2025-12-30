"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import api from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export function VerifyForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || ""

    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            // Verify endpoint uses Query Params
            await api.post(`/verify?email=${encodeURIComponent(email)}&otp=${otp}`)
            toast.success("Account verified! You can now login.")
            router.push("/login")
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Verification failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Verify Account</CardTitle>
                <CardDescription>Enter the OTP sent to {email}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="otp">OTP Code</Label>
                            <Input id="otp" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength={6} />
                        </div>
                        <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                            {isLoading ? "Verifying..." : "Verify"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
