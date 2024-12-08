import { MessageDto } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type MessageState = {
    messages: MessageDto[];
    unreadCount: number;
    add: (message: MessageDto) => void;
    remove: (messageId: string) => void;
    set: (messages: MessageDto[]) => void;
    updateUnreadCount: (amount: number) => void;
}

const useMessageStore = create<MessageState>()(devtools((set) => ({
    messages: [],
    unreadCount: 0,
    add: (message: MessageDto) => set((state) => ({ messages: [...state.messages, message] })),
    remove: (messageId: string) => set((state) => ({ messages: state.messages.filter((msg) => msg.id !== messageId) })),
    set: (messages: MessageDto[]) => set({ messages }),
    updateUnreadCount: (amount: number) => set((state) => ({ unreadCount: state.unreadCount + amount })),
}), { name: 'messageStore' }));

export default useMessageStore