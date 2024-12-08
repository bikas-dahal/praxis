import {v4} from "uuid";
import {getVerificationTokenByEmail} from "@/data/auth/verification-token";
import {getPasswordResetTokenByEmail} from "@/data/auth/password-reset-token";
// import crypto from "crypto";
import { prisma } from "./prisma";


export const generatePasswordResetToken = async (email: string) => {
    const token = v4()

    const expires = new Date(Date.now() + 3600 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
        await prisma.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return passwordResetToken

}

export const generateVerificationToken = async (email: string) => {
    const token = v4()
    const expires = new Date(Date.now() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }
 
    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken
}