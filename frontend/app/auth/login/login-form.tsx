"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react"



export default function LoginForm() {
  const router = useRouter()
  const [status, setStatus] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const tabValue = searchParams.get('value')

  // All your existing form state and handlers
  const [formData, setFormData] = useState({
    name: "",
    sin: "",
    address: "",
    registrationDate: new Date().toISOString().split("T")[0],
  });
  const [isGoogleButtonEnabled, setGoogleButtonEnabled] = useState(false);

  useEffect(() => {
    const { name, sin, address } = formData;
    setGoogleButtonEnabled(!!(name && sin && address)); 
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleOAuthLogin = async () => {
    // Your existing login code
    setStatus("Logging in with Google...")
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus("Login successful!")
      router.push("/")
    } catch (error) {
      setStatus("Login failed. Please try again." + (error as Error).message)
    }
  }

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    // Your existing signup code
    event.preventDefault()
    setStatus("Signing up...")
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus("Signup successful! Redirecting...")
      router.push("/")
    } catch (error) {
      setStatus("Signup failed. Please try again." + (error as Error).message)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-black">Authenticate</CardTitle>
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
              {/* Your login form content */}
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/login?value=signup" className="text-primary underline-offset-4 hover:underline">
                Signup
              </Link>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-4">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleOAuthLogin}
                type="submit">
                Continue with Google
              </Button>
            </div>
            {status && <p className="mt-2 text-center text-sm text-gray-600">{status}</p>}
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="sin">SIN</Label>
                  <Input
                    id="sin"
                    type="number"
                    placeholder="Social Insurance Number"
                    value={formData.sin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Your Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="registrationDate">Registration Start Date</Label>
                  <Input
                    id="registrationDate"
                    type="text"
                    value={formData.registrationDate}
                    readOnly
                  />
                </div>
              </div>
            </form>
            <Separator className="my-4" />
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={(e) => { e.preventDefault(); handleSignup(e as unknown as React.FormEvent<HTMLFormElement>); }}
                disabled={!isGoogleButtonEnabled}
                type="submit"
              >
                Finish with Google
              </Button>
            </div>
            {status && <p className="mt-2 text-center text-sm text-gray-600">{status}</p>}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}