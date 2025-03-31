"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [status, setStatus] = useState<string | null>(null)

    const searchParams = useSearchParams()

    const tabValue = searchParams.get('value')





    const handleOAuthLogin = async () => {
    setStatus("Logging in with Google...")
    try {
      // Simulate OAuth login process
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      setStatus("Login successful!")
      router.push("/") // Redirect to homepage after successful login
    } catch (error) {
      setStatus("Login failed. Please try again." + error.message)
    }
  }


    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("Signing up...")
    try {
      // Simulate signup process
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      setStatus("Signup successful! Redirecting...")
      router.push("/") // Redirect to homepage after successful signup
    } catch (error) {
      setStatus("Signup failed. Please try again." + error.message)
    }
  }


    return (
    <main className="flex min-h-screen flex-col">
        <Navbar />
        
        <div className="flex flex-1 items-center justify-center bg-muted/30 py-12 px-4">
        <Card className=" w-full max-w-md">
            <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-black">Login</CardTitle>
            <CardDescription>We only use your Google account for login. Please continue below with Google OAuth.</CardDescription>
            </CardHeader>           
            <CardContent>
              <Tabs defaultValue={(tabValue !== "signup" ? "login" : "signup")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Customer Login</TabsTrigger>
                  <TabsTrigger value="signup">Customer Signup</TabsTrigger>
                </TabsList>
                
                


                
                <TabsContent value="login">
                <form>
                    <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                            Forgot password?
                        </Link>
                        </div>
                        <Input id="password" type="password" />
                    </div>
                    <Button className="w-full" type="submit">
                        Login
                    </Button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-primary underline-offset-4 hover:underline">
                    Register
                    </Link>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-4">
                    <Button variant="outline" className="w-full">
                    Continue with Google
                    </Button>
                </div>
                </TabsContent>
                <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" type="text" placeholder="Your Name" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <Button className="w-full" type="submit">
                      Signup
                    </Button>
                  </div>
                </form>
                <Separator className="my-4" />
                <div className="grid gap-4">
                  <Button variant="outline" className="w-full" onClick={handleOAuthLogin}>
                    Finish with Google
                  </Button>
                </div>
                {status && <p className="mt-2 text-center text-sm text-gray-600">{status}</p>}
              </TabsContent>
                <TabsContent value="xyz">
                    {/* signup if the url has signup attribut or clicked. has a bunch of attributes that are filled that enable a finish with google buttom that triggers OAuth google and pushes all of that to an endpoint. has a status element tag to display status should be one for login too */}
                </TabsContent>
              </Tabs>
            </CardContent>
        </Card>

        </div>
    <Footer />

    </main>
  )
}

