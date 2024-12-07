import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { format, formatDistance, isValid } from "date-fns"
import { MessageDto, MessagewithObject } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatShortDateTime(date: Date | string) { // Accept both Date and string
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  if (!isValid(parsedDate)) {
      return 'Invalid date'
  }
  return format(parsedDate, 'dd MMM yy h:mm a') // Fixed format string
}

export function timeAgo(date: string | Date) { // Accept both types
  console.log('date:', date);

  if (date === null) {
    return null
  }
  
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return formatDistance(parsedDate, new Date()) + ' ago';
}

export function mapMessage(message: MessagewithObject): MessageDto {
  // console.log('message:', message);

  // const gg =message[0]
  
  return {
    id: message.id,
    text: message.text,
    createdAt: formatShortDateTime(message.createdAt),
    dateRead: message.dateRead ? formatShortDateTime(message.dateRead) : null,
    senderId: message.sender?.id,
    senderName: message.sender?.name,
    senderImage: message.sender?.image,
    receiverId: message.receiver?.id,
    receiverName: message.receiver?.name,
    receiverImage: message.receiver?.image,
  }
}

export function createChatId(senderId: string, receiverId: string) {
  return senderId > receiverId ? `${receiverId}-${senderId}` : `${senderId}-${receiverId}`
}