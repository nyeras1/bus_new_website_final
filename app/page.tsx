"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Hardcoded credentials for each user type
const CREDENTIALS = {
  student: { username: "user", password: "user123" },
  admin: { username: "admin", password: "admin123" },
}

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("student")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate network request
    setTimeout(() => {
      const validCredentials = CREDENTIALS[userType as keyof typeof CREDENTIALS]

      if (username === validCredentials.username && password === validCredentials.password) {
        toast({
          title: "Login successful",
          description: `Welcome, ${userType}!`,
        })

        // Redirect based on user type
        router.push(`/${userType}`)
      } else {
        setError("Invalid username or password")
      }

      setLoading(false)
    }, 1000)
  }

  return (
    <div className="relative min-h-screen w-full">
      {/* Full-page background image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/college.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay to improve form readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Centered login form */}
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg sm:p-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Login to SRGEC Transportation Portal</h2>
            <p className="mt-2 text-sm text-gray-600">Enter your credentials to access the {userType} portal</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Select User Type</Label>
              <RadioGroup
                value={userType}
                className="flex justify-center space-x-4"
                onValueChange={(value) => setUserType(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

