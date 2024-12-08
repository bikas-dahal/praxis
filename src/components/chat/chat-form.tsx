'use client';

import { sendMessage } from "@/actions/messageActions";
import { useCurrentUser } from "@/hooks/use-current-user";
import { messageSchema } from "@/schemas/messageSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";

interface Props {
    id: string
}

export const ChatForm = ({ id }: Props) => {

    const { register, handleSubmit, reset,  } = useForm({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            text: ''
        }
    })

    const router = useRouter()

    const currentUser = useCurrentUser()

    if (!currentUser) return null
    
    // @ts-excpect-error
    const onSubmit = async (data: any) => {
        try {
            const response = await sendMessage(data, id, currentUser.id!)

            if (response.status === 'error') {
                toast.error('Failed to send message')
                return
            }
            router.refresh()
            reset()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-between w-full">
            <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                {...register('text')}
            />
            <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
        </form>
    )
}