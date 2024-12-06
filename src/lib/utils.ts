import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { format, isValid } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatShortDateTime(date: Date) {
  console.log('date:', date);
  
  console.log('typeof date:', typeof date);
  

  const parsedDate = typeof date === "string" ? new Date(date) : date;
  if (!isValid(parsedDate)) {
    return 'Invalid date'
  }
  return format(parsedDate, 'dd-MMM-yy h:mm:a')
}

export function mapMessage(message: MessagewithObject): MessageDto {
  console.log('message:', message);

  const gg =message[0]
  
  return {
    id: gg.id,
    text: gg.text,
    createdAt: formatShortDateTime(gg.createdAt),
    dateRead: gg.dateRead ? formatShortDateTime(gg.dateRead) : null,
    senderId: gg.sender?.id,
    senderName: gg.sender?.name,
    senderImage: gg.sender?.image,
    receiverId: gg.receiver?.id,
    receiverName: gg.receiver?.name,
    receiverImage: gg.receiver?.image,
  }
}