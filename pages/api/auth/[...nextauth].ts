import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma, { redis } from "../../../lib/prisma";

export const authoptions: NextAuthOptions = {
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
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        const dbUser = await prisma.user.findFirst({
          where: { email: user?.email! }
        });

        if (dbUser) {
          return {
            ...token,
            userId: Buffer.from(dbUser.id).toString("base64"),
            updatedAt: dbUser.updatedAt.toString(),
            createdAt: dbUser.createdAt.toString()
          };
        } else {
          const newUser = await prisma.user.create({
            data: { name: user?.name!, email: user?.email! }
          });
          return {
            ...token,
            userId: Buffer.from(newUser.id).toString("base64"),
            updatedAt: newUser!.updatedAt.toString(),
            createdAt: newUser.createdAt.toString()
          };
        }
      }

      return token;
    },
    async session({ token, session }) {
      session.userId = token.userId;
      session.updatedAt = token.updatedAt;
      session.createdAt = token.createdAt;
      return session;
    }
  }
};

export default NextAuth(authoptions);
