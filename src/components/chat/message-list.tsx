'use client'

import { MessageDto } from "@/types";
import { useCallback, useEffect, useState } from "react";
import MessageBox from "./messages";
import { pusherClient } from "@/lib/pusher";
import { formatShortDateTime } from "@/lib/utils";

export const MessageList = ({ initialMessages, userId, chatId }: { initialMessages: MessageDto[], userId: string, chatId: string }) => {
    const [messages, setMessages] = useState(initialMessages)

    const handleNewMessage = useCallback((message: MessageDto) => {
        setMessages((prevMessages) => [...prevMessages, message])
    }, []) 

    
    const handleReadMessage = useCallback((messageIds: string[]) => {
        setMessages((prevMessages) => prevMessages.map((message) => (
            messageIds.includes(message.id) ? 
            { 
                ...message, 
                dateRead: formatShortDateTime(new Date()), 
            } : message
        )))
    }
    , [])
    
    useEffect(() => {
        const channel = pusherClient.subscribe(chatId);

        channel.bind('message:new', handleNewMessage)
        channel.bind('message:read', handleReadMessage)

        return () => {
            channel.unsubscribe()
            channel.unbind('message:new', handleNewMessage)
            channel.unbind('message:read', handleReadMessage)
        }
    }, [chatId])

    return (
        <div>
            {messages.length === 0 ? <div>No messages yet</div> : (
                <>
                    <MessageBox messages={messages} currentUserId={userId} />
                </>
            )}
        </div>
    )
}