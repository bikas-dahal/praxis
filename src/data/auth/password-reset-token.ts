import { prisma } from '@/lib/prisma'


export const getPasswordResetToken = async (token: string) => {
    try {
        return await prisma.passwordResetToken.findUnique({
            where: {
                token
            }
        })
    } catch (e) {
        console.log(e)
        return null
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const token =  await prisma.passwordResetToken.findFirst({
            where: {
                email
            }
        })
        return token
    } catch (e) {
        console.log(e)
        return null
    }
}