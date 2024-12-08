'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"
import { createChatId, mapMessage } from "@/lib/utils"
import { messageSchema } from "@/schemas/messageSchema"
import { ActionResult, GetMemberParams, MessageDto, PaginatedResponse } from "@/types"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"


export const getMembers = async ({
    dateRange = '5',
    // nature = 'reader,writer',
    orderBy = 'updated',
    // withPhoto = true,
    pageNumber = 1,
    pageSize = 50
}: GetMemberParams): Promise<PaginatedResponse<Prisma.UserGetPayload<{
    select: {
        id: true,
        name: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        username: true,
        email: true
    }
}> & { nature?: string }>> => {
    const session = await auth();
    if (!session) {
        throw new Error('User is not authenticated');
    }
    const userId = session.user?.id;

    // Parse nature array
    // const natureArray = nature.split(',').map(n => n.trim());

    // Convert dateRange to a date
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - parseInt(dateRange));

    // Pagination
    const page = Math.max(1, pageNumber);
    const take = Math.max(1, pageSize);
    const skip = (page - 1) * take;

    try {
        // Construct dynamic where clause
        const whereCondition: Prisma.UserWhereInput = {
            NOT: { id: userId }, // Exclude current user
        };

        // Filter by nature (reader/writer)
        // if (natureArray.length > 0 && !natureArray.includes('reader,writer')) {
        //     whereCondition.blogs = natureArray.includes('writer')
        //         ? { some: {} }
        //         : natureArray.includes('reader')
        //         ? { none: {} }
        //         : {};
        // }

        // Filter by date range
        whereCondition.createdAt = { gte: cutoffDate };

        // Filter by photo
        // if (withPhoto) {
        //     whereCondition.image = { not: null };
        // }

        // Determine order by
        const orderByCondition: Prisma.UserOrderByWithRelationInput =
            orderBy === 'created'
                ? { createdAt: 'desc' }
                : { updatedAt: 'desc' };

        // Use Promise.all for parallel fetching
        const [totalCount, members] = await Promise.all([
            prisma.user.count({ where: whereCondition }),
            prisma.user.findMany({
                where: whereCondition,
                orderBy: orderByCondition,
                skip,
                take,
                select: {
                    id: true,
                    name: true,
                    image: true,
                    createdAt: true,
                    updatedAt: true,
                    role: true,
                    username: true,
                    email: true,
                    blogs: {
                        select: { id: true }
                    }
                }
            })
        ]);

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / take);

        // Transform members to include nature
        const transformedMembers = members.map(member => ({
            ...member,
            nature: member.blogs.length > 0 ? 'writer' : 'reader'
        }));

        return {
            items: transformedMembers,
            totalCount,
            page,
            pageSize: take,
            totalPages
        };
    } catch (error) {
        console.error('Get members error:', error);
        throw error;
    }
};

export const getMesssages = async (receiverId: string) => {
    try {
        const session = await auth(); // Validate session

        if (!session || !session.user || !session.user.id) {
            console.error('Session is invalid or user is not authenticated.');
            return { messages: [], readCount: 0 }
        }
        
        const senderId = session.user?.id
    
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

        let readCount = 0

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

            readCount = unreadMessagesId.length

            await pusherServer.trigger(createChatId(senderId, receiverId), 'message:read', unreadMessagesId)
        }

        const formattedMessage = messages.map((message) => mapMessage(message))
        
        return { messages: formattedMessage,  readCount} // Add status for consistency
    } catch (error) {
        console.error('Message fetching error:', error)
        throw error // Return empty array and error status
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

        await pusherServer.trigger(`private-${receiver}`, 'message:new', MessageDto)

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

export async function getUnreadMessageCount () {
    try {
        const session = await auth();
        
        const count = await prisma.message.count({
            where: {
                receiverId: session?.user?.id,
                dateRead: null,
                receiverDelete: false
            }
        })

        return count;

    } catch (error) {
        console.error('Unread message count error:', error)
        throw error
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