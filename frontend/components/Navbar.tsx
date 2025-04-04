"use client";

import Link from 'next/link';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Navbar({ username }: { username?: string }) {
  return (
    <header className="bg-primary text-primary-foreground py-6 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Hello {username ?? 'Guest'}</h1>
              <p className="text-sm md:text-base opacity-90">
                Book rooms across North America&apos;s top hotel chains.
              </p>
            </div>
          </Link>

          <div className="flex gap-4">
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
