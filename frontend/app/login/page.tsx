import { Suspense } from "react"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import LoginForm from "./login-form"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center bg-muted/30 py-12 px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}