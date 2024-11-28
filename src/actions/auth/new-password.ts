'use server'

import * as z from 'zod'
import { newPasswordSchema} from "@/schemas/authSchema";
import {getPasswordResetToken} from "@/data/auth/password-reset-token";
import {getUserByEmail} from "@/data/auth/user";
import bcrypt from "bcryptjs";
import { prisma } from '@/lib/prisma';


export const newPassword = async (values: z.infer<typeof newPasswordSchema>, token: string) =>{
    if (!token) {
        return {
            error: 'No token provided',
        }
    }

    const validatedFields = newPasswordSchema.safeParse(values)
    if (!validatedFields) {
        return {
            error: 'Invalid credentials'
        }
    }

    const { password } = validatedFields.data

    const existingToken = await getPasswordResetToken(token)
    if (!existingToken) {
        return {
            error: 'Invalid token',
        }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) {
        return {
            error: 'Token has expired',
        }
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return {
            error: 'Invalid email provided',
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
        where: {id: existingUser.id},
        data: {
            password: hashedPassword,
        }
    })

    await prisma.passwordResetToken.delete({
        where: {id: existingToken.id},
    })

    return {
        success: 'Your password has been changed successfully',
    }

}