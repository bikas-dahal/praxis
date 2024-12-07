import { create } from "zustand";
import { devtools } from "zustand/middleware";

type PresenceStore = {
    membersIds: string[];
    add: (userId: string) => void;
    remove: (userId: string) => void;
    set: (userIds: string[]) => void;
}

const usePresenceStore = create<PresenceStore>()(devtools((set) => ({
    membersIds: [],
    add: (userId: string) => set((state) => ({ membersIds: [...state.membersIds, userId] })),
    remove: (userId: string) => set((state) => ({ membersIds: state.membersIds.filter((id) => id !== userId) })),
    set: (userIds: string[]) => set({ membersIds: userIds }),
}), { name: 'presenceStore' }));

export default usePresenceStore