import NextAuth from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "@/lib/db"
import { authConfig } from "./auth.config"




export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },

  ...authConfig,
  // Override any callbacks from authConfig with local definitions
  events: {
    linkAccount: async ({ user, account, profile }) => {
      // Only update emailVerified for GitHub and Google providers
      if (account.provider === "github" || account.provider === "google") {
        try {
          await db.user.update({
            where: { id: user.id },
            data: {
              emailVerified: new Date(),
            }
          });
          console.log('Successfully updated emailVerified for user:', user.id);
        } catch (error) {
          console.error('Failed to update emailVerified:', error);
        }
      }
      
      console.log('LinkAccount callback triggered:', { 
        userId: user.id,
        provider: account.provider
      });
    },
    createUser: async ({ user }) => {
      // Get the most recently linked account for this user
      const account = await db.account.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      });
      
      // Only set emailVerified for GitHub and Google accounts
      if (account?.provider === "github" || account?.provider === "google") {
        try {
          const result = await db.user.update({
            where: { id: user.id },
            data: {
              emailVerified: new Date(),
            }
          });
          console.log('Successfully set emailVerified for new user:', result);
        } catch (error) {
          console.error('Failed to set emailVerified for new user:', error);
        }
      }
    }
  },

  callbacks: {

  
      async signIn({ user, account, profile }) {
        if (account && user) {
        try {
          // First check if user exists
          const existingUser = await db.user.findUnique({
            where: { email: user.email || '' },
            include: { accounts: true },
          });

          if (existingUser) {
            // If user exists but doesn't have this provider account, create it
            if (!existingUser.accounts.some(acc => acc.provider === account.provider)) {
              await db.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  token_type: account.token_type,
                  scope: account.scope,
                },
              });
            }
            return true;
          }

          // If user doesn't exist, create new user with emailVerified for GitHub/Google
          const userData = {
            password: '',
            email: user.email || '',
            name: user.name,
            image: user.image,
            ...(account.provider === "github" || account.provider === "google" ? {
              emailVerified: new Date()
            } : {}),
            accounts: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                token_type: account.token_type,
                scope: account.scope,
              },
            },
          };

          await db.user.create({
            data: userData
          });
          
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
})
