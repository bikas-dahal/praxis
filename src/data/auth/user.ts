import {prisma} from "@/lib/prisma"

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    } catch (err) {
        return {
            error: 'Email Already Exists'
        }
    }
}

export const getUserById = async (id: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id
            }
        })
    } catch (err) {
        return {
            error: 'User does not exist'
        }
    }
}