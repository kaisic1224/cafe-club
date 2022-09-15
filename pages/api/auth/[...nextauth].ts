import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/signin"
  }
});
