"use client";

import Link from 'next/link';
import {
  // SignInButton,
  // SignUp,
  // SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Button } from '@/components/ui/button'; 


export default function Navbar({ username }: { username?: string }) {
  return (
    <header className="bg-primary text-primary-foreground py-6 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Hello {((username) ? username : 'Guest')}</h1>
              <p className="text-sm md:text-base opacity-90">
                Book rooms across North America&apos;s top hotel chains.
              </p>
            </div>
          </Link>

          <div className="flex gap-4">
            <SignedOut>
              <Button variant="secondary" asChild> 
                <Link href="/sign-in">Login</Link>
                {/* <SignInButton  /> */}
              </Button>
            </SignedOut>
            <SignedOut>
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white" asChild>
                <Link href="/sign-up">Sign Up</Link>
                {/* <SignUpButton  /> */}
              </Button>
            </SignedOut>

            <SignedIn>
              <Button variant="secondary" asChild> 
                <Link href="/dashboard">My Profile</Link>
              </Button>
            </SignedIn> 
            <SignedIn>
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white" asChild>
                <UserButton />
              </Button>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
