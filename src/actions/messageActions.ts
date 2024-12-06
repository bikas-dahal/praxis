'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { mapMessage } from "@/lib/utils"
import { messageSchema } from "@/schemas/messageSchema"


export const getMesssages = async (receiverId: string) => {
    try {
        const session = await auth()

        if (!session) {
            return { status: 401 }
        }
        
        const senderId = session?.user?.id!
    
        console.log('Sender ID:', senderId);
        
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: senderId,
                        receiverId: receiverId,
                        senderDelete: false
                    },
                    {
                        senderId: receiverId,
                        receiverId: senderId,
                        receiverDelete: false
                    }
                ]
            },
            orderBy: {
                createdAt: 'asc'
                },
                select: {
                    id: true,
                    text: true,
                    createdAt: true,
                    dateRead: true,
                    sender: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    },
                    receiver: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    }
                }
        })

        const formattedMessage = mapMessage(messages)

        return { status: 'success', data: formattedMessage }
    
    } catch (error) {
        console.error('Message fetching error:', error)
        return { status: 'error', error: 'Failed to fetch messages' }
        
    }
    
}

export const sendMessage = async (message: string, receiver: string, sender: string) => {
    try {

        const parsedMessage = messageSchema.safeParse(message)

        if (!parsedMessage.success) {
            return {
                status: 'error',
                error: 'Invalid message',
                details: parsedMessage.error.flatten()
            }
        }

        const parsedMessageData = parsedMessage.data

        const messageResponse = await prisma.message.create({
            data: {
                text: parsedMessageData.text,
                receiverId: receiver,
                senderId: sender
            }
        })

        return {
            status: 'success',
            data: messageResponse
        }
        
    } catch (error) {
        console.error('Message sending error:', error)
        return {
            status: 'error',
            error: 'Failed to send message'
        }
        
    }
}