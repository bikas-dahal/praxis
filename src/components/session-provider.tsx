import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export const SessionProvide = async ({ children }: {children: React.ReactNode}) => {

    const session = await auth();

    if (!session) {
        return null
    }

    return(
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
        )
}
