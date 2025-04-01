"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabValue = searchParams.get('value')
  const [status, setStatus] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    sin: "",
    address: "",
    registrationDate: new Date().toISOString().split("T")[0],
  });

  const [isSignupEnabled, setSignupEnabled] = useState(false);

  useEffect(() => {
    const { name, email, password, sin, address } = formData;
    setSignupEnabled(!!(name && email && password && sin && address)); 
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Logging in...");

    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus("Login failed: " + error.message);
    } else {
      setStatus("Login successful! Redirecting...");
      router.push("/");
    }
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Signing up...");
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Store additional user info in Supabase
      const { error: dbError } = await supabase.from("profiles").insert({
        id: data.user?.id,
        name: formData.name,
        sin: formData.sin,
        address: formData.address,
        registration_date: formData.registrationDate,
      });

      if (dbError) throw dbError;

      setStatus("Signup successful! Redirecting...");
      router.push("/");
    } catch (error) {
      setStatus("Signup failed: " + (error as Error).message);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-black">Authenticate</CardTitle>
        <CardDescription>Please enter your credentials to continue.</CardDescription>
      </CardHeader>           
      <CardContent>
        <Tabs defaultValue={(tabValue !== "signup" ? "login" : "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Customer Login</TabsTrigger>
            <TabsTrigger value="signup">Customer Signup</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Choose a Password"
                    value={formData.password}
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
              <Separator className="my-4" />
              <div className="grid gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={!isSignupEnabled}
                  type="submit"
                >
                  Finish Signup
                </Button>
              </div>
            </form>
            {status && <p className="mt-2 text-center text-sm text-gray-600">{status}</p>}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
