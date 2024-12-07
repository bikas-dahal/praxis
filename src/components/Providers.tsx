// 'use client'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { usePresenceChannel } from '@/hooks/chat/use-presence-channel';



export default function Providers({ children }: { children: React.ReactNode }) {

    // usePresenceChannel()  

    return (
        <>
            <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
            />
            <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
            {children}
        </>
    )
}