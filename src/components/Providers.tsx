// 'use client'

import { ToastContainer } from 'react-toastify';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from '@/app/api/uploadthing/core';
// import { usePresenceChannel } from '@/hooks/chat/use-presence-channel';
import 'react-toastify/dist/ReactToastify.css';



export default function Providers({ children }: { children: React.ReactNode }) {

    // usePresenceChannel()  

    return (
        <>
            
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