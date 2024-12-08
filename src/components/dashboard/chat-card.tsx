'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import useMessageStore from '@/hooks/chat/use-message-store'

const ChatCard = () => {
    const unreadCount = useMessageStore((state) => state.unreadCount);

  return (
    <div>
      <Card className="flex-1 min-w-[300px] max-w-[400px]">
        <CardHeader>
          <h2 className="text-lg font-semibold">Chat(✅) 
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-500 text-white rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </h2>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500">
            Engage with peers and mentors in real-time.
          </div>
          <Button className="mt-4 w-full" asChild>
            <Link href="/dashboard/chat">Open Chat</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatCard
