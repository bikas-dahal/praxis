import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";
import { getUserById } from "./data/auth/user";
import { getAccountByUserId } from "./data/auth/account";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: 'auth/login',
        error: 'auth/error',

    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: {
                    id: user.id,
                }, data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        async signIn({ user, account}) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById( user.id! );

            // if (!existingUser?.emailVerified) {
            //     return false
            // }

            console.log('eu', existingUser)

            return true
        },

        async session({ token, session}) {
            console.log({stoken: token})
            console.log("session", session)

            if (session.user && token.sub) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role
            }

            if (session.user) {
                session.user.name = token.name
                session.user.email = token.email
                session.user.isOAuth = token.isOAuth as boolean
            }
            // session.user.hi = 'hyalo'
            // console.log(session)

            return session
        },
        async jwt({ token }) {
            console.log('called')

            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token

            const existingAccount = await getAccountByUserId(existingUser.id)


            token.isOAuth = !!existingAccount
            token.name = existingUser.name
            token.email = existingUser.email
            token.role = existingUser.role

            return token
        }
    },
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    ...authConfig
})