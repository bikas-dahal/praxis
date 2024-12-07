import { ZodIssue } from 'zod';

type ActionResult<T> =
    { status: 'success', data: T } | { status: 'error', error: string | ZodIssue[] }



export type MessagewithObject = Prisma.MessageGetPayload<{
    select: {
        id: true;
        text: true;
        createdAt: true;
        dateRead: true;
        sender: {
            select: {
                id: true
                name: true
                image: true
            }
        }
        receiver: {
            select: {
                id: true
                name: true
                image: true
            }
        }
    }
}>



export type MessageDto = {
    id: string;
    text: string;
    createdAt: string;
    dateRead: string | null;
    senderId?: string;
    receiverId?: string;
    senderName?: string;
    receiverName?: string;
    senderImage?: string | null;
    receiverImage?: string | null;
}