type MessagewithObject = Prisma.MessageGetPayload<{
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



type MessageDto = {
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