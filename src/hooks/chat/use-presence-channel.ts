import { useCallback, useEffect, useRef } from "react"
import usePresenceStore from "./use-presence-store"
import { Channel, Members } from "pusher-js"
import { pusherClient } from "@/lib/pusher"


export const usePresenceChannel = () => {
    const set = usePresenceStore((state) => state.set);
    const add = usePresenceStore((state) => state.add);
    const remove = usePresenceStore((state) => state.remove);

    const channelRef = useRef<Channel | null>(null);

    const handleSetMembers = useCallback((memberIds: string[]) => {
        set(memberIds)
    }, [set])

    const handleAddMember = useCallback((memberId: string) => {
        add(memberId)
    }, [add])

    const handleRemoveMember = useCallback((memberId: string) => {
        remove(memberId)
    }, [remove])

    useEffect(() => {
        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe('presence-chat')

            channelRef.current.bind('pusher:subscription_succeeded', (members: Members) => {
                handleSetMembers(Object.keys(members.members))
            })

            channelRef.current.bind('pusher:member_added', (member: Record<string, any>) => {
                handleAddMember(member.id)
            })

            channelRef.current.bind('pusher:member_removed', (member: Record<string, any>) => {
                handleRemoveMember(member.id)
            })


        }

        return () => {
            if (channelRef.current) {
                channelRef.current.unsubscribe()
                channelRef.current.unbind('pusher:subscription_succeeded')
                channelRef.current.unbind('pusher:member_added')
                channelRef.current.unbind('pusher:member_removed')
            }
        }
    }, [handleAddMember, handleRemoveMember, handleSetMembers])


}