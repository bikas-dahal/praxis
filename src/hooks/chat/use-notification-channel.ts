import { usePathname } from "next/navigation";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";
import useMessageStore from "./use-message-store";
import { MessageDto } from "@/types";
import { pusherClient } from "@/lib/pusher";
import { newMessageToast } from "@/components/notification-toase";

export const useNotificationChannel = (userId: string) => {
    const channelRef = useRef<Channel | null>(null);

    const pathname = usePathname();
    // const serachParams = useSearchParams();

    const add = useMessageStore((state) => state.add);
    const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);

    const handleNewMessage = useCallback((message: MessageDto) => {
        if (pathname !== `/dashboard/chat/${message.senderId}`) {
            add(message);
            updateUnreadCount(1);
            newMessageToast(message);
        }
    }, [add, pathname, updateUnreadCount]);

    useEffect(() => {
        if (!userId) return;

        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe(`private-${userId}`);

            channelRef.current.bind('message:new', handleNewMessage);
        }

        return () => {
            if (channelRef.current) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind('message:new', handleNewMessage);
                channelRef.current = null;
            }
        }
    }, [userId, handleNewMessage]);
}