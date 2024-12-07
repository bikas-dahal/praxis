'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"
import { createChatId, mapMessage } from "@/lib/utils"
import { messageSchema } from "@/schemas/messageSchema"
import { ActionResult, MessageDto } from "@/types"
import { revalidatePath } from "next/cache"


export const getMesssages = async (receiverId: string) => {
    try {
        const session = await auth(); // Validate session

        if (!session || !session.user || !session.user.id) {
            console.error('Session is invalid or user is not authenticated.');
            return { status: 401, formattedMessage: [] };
        }
        
        const senderId = session?.user?.id!
    
        // console.log('Sender ID:', senderId);
        
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
                select: messageSelect
        })

        if (messages.length > 0) {

            const unreadMessagesId = messages.filter((message) => (
                message.dateRead === null && message.receiver?.id === senderId && message.sender?.id === receiverId   
            )).map((message) => message.id)

            await prisma.message.updateMany({
                where: {
                    dateRead: null,
                    receiverId: senderId,
                    senderId: receiverId
                },
                data: {
                    dateRead: new Date()
                }
            })

            await pusherServer.trigger(createChatId(senderId, receiverId), 'message:read', unreadMessagesId)
        }

        const formattedMessage = messages.map((message) => mapMessage(message))
        
        return { formattedMessage, status: 200 } // Add status for consistency
    } catch (error) {
        console.error('Message fetching error:', error)
        return { formattedMessage: [], status: 500 } // Return empty array and error status
    }
}

export const sendMessage = async (message: string, receiver: string, sender: string): Promise<ActionResult<MessageDto>> => {
    try {
        const parsedMessage = messageSchema.safeParse(message)
        if (!parsedMessage.success) {
            return {
                status: 'error',
                error: 'Invalid message',
                // details: parsedMessage.error.flatten()
            }
        }

        const parsedMessageData = parsedMessage.data

        const messageResponse = await prisma.message.create({
            data: {
                text: parsedMessageData.text,
                receiverId: receiver,
                senderId: sender
            },
            select: messageSelect
        })

        const MessageDto = mapMessage(messageResponse)

        await pusherServer.trigger(createChatId(sender, receiver), 'message:new', MessageDto)
        revalidatePath(`/dashboard/chat`)

        return {
            status: 'success',
            data: MessageDto
        }
        
    } catch (error) {
        console.error('Message sending error:', error)
        return {
            status: 'error',
            error: 'Failed to send message'
        }
        
    }
}


const messageSelect = {
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


// export async function deleteMessage(messageId: string, isOutbox: boolean) {
//     const selector = isOutbox ? 'senderDeleted' : 'recipientDeleted';

//     try {
//         const userId = await getAuthUserId();

//         await prisma.message.update({
//             where: { id: messageId },
//             data: {
//                 [selector]: true
//             }
//         })

//         const messagesToDelete = await prisma.message.findMany({
//             where: {
//                 OR: [
//                     {
//                         senderId: userId,
//                         senderDeleted: true,
//                         recipientDeleted: true
//                     },
//                     {
//                         recipientId: userId,
//                         senderDeleted: true,
//                         recipientDeleted: true
//                     }
//                 ]
//             }
//         })

//         if (messagesToDelete.length > 0) {
//             await prisma.message.deleteMany({
//                 where: {
//                     OR: messagesToDelete.map(m => ({ id: m.id }))
//                 }
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }