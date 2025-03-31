// import { prisma } from '@/lib/prisma';
// import { session } from '@/lib/session'

import { NextAuthOptions } from "next-auth";
import NextAuth from 'next-auth/next';
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SCECRET;



const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour
        updateAge: 60 * 5, // 5 minutes
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID ?? "",
            clientSecret: GOOGLE_CLIENT_SECRET ?? ""
            // profile(profile: GoogleProfile) {
            //     return {
            //         id: profile.sub,
            //         name: profile.name,
            //         email: profile.email,
            //         image: profile.picture,
            //     };
            // },
        }),
    ],
      pages: {
    signIn: '/auth/signin',  // Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile }) {
            if (!profile?.email && !account?.provider) {
                throw new Error("Not found");
            }
            // if (account?.provider === "google") {
            //     return profile?.email_verified && profile.email.endsWith("@example.com")
            // }
        return true // Do different verification for other providers that don't have `email_verified`
        },
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }