import { z } from "zod";

export const messageSchema = z.object({
    text: z.string().min(1, 'Message must be at least 1 character long'),
})

export type MessageSchema = z.infer<typeof messageSchema>

