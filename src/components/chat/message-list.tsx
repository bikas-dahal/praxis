'use client'

import { MessageDto } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import MessageBox from "./messages";
import { pusherClient } from "@/lib/pusher";
import { formatShortDateTime } from "@/lib/utils";
import useMessageStore from "@/hooks/chat/use-message-store";

export const MessageList = ({ initialMessages, userId, chatId }: { initialMessages: {messages: MessageDto[], readCount: number}, userId: string, chatId: string }) => {
    const [messages, setMessages] = useState(initialMessages.messages)

    const handleNewMessage = useCallback((message: MessageDto) => {
        setMessages((prevMessages) => [...prevMessages, message])
    }, []) 

    const setReadCount = useRef(false)

    const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount)

    useEffect(() => {
        if (!setReadCount.current) {
            updateUnreadCount(-initialMessages.readCount)
            setReadCount.current = true
        }
    }, [initialMessages.readCount, updateUnreadCount])
    
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
    }, [chatId, handleNewMessage, handleReadMessage])

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