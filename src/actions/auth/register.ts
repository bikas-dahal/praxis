'use server'

import * as z from 'zod'
import { RegisterSchema } from "@/schemas/authSchema";
import bcrypt from 'bcryptjs'
import { getUserByEmail } from "@/data/auth/user";
import { prisma } from '@/lib/prisma';


export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields) {
        return {
            error: 'Invalid login credentials'
        }
    }

    const { username, email, password } = validatedFields.data!

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    console.log(existingUser)

    if (existingUser) {
        return {
            error: 'Email already in use!',
        }
    }

    await prisma.user.create({
        data: {
            name: username,
            username,
            email,
            password: hashedPassword
        },
    })

    // const verificationToken = await generateVerificationToken(email)


    //Verification token email todo
    // await sendVerificationEmail(
    //     verificationToken.email,
    //     verificationToken.token,
    // )

    return {
        success: 'Registered for now'
    }
}