"use client";

import { useState } from "react";
import { login, signup } from "@/app/login/actions"; // Import server actions
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login"); // Track tab changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setStatus(null); // Reset status when switching tabs
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Logging in...");

    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);

    const result = await login(form);

    if (result?.error) {
      setStatus(`Login failed: ${result.error}`);
    } else {
      setStatus("Login successful! Redirecting...");
    }
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Signing up...");

    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);

    const result = await signup(form);

    if (result?.error) {
      setStatus(`Signup failed: ${result.error}`);
    } else {
      setStatus("Signup successful! Check your email to confirm your account.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black text-center">
          Welcome
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(tab) => handleTabChange(tab as "login" | "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* LOGIN FORM */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>
          </TabsContent>

          {/* SIGNUP FORM */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Choose a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </form>
          </TabsContent>

          {/* STATUS MESSAGE */}
          {status && (
            <p className={`mt-2 text-center text-sm ${status.includes("failed") ? "text-red-600" : "text-green-600"}`}>
              {status}
            </p>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
