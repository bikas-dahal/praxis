  import { getMesssages } from "@/actions/messageActions";
  import { auth } from "@/auth";
  import { ChatForm } from "@/components/chat/chat-form";
  import { MessageList } from "@/components/chat/message-list";
  // import MessageBox from "@/components/chat/messages";
import PresenceDot from "@/components/chat/presence-dot";
  import { prisma } from "@/lib/prisma";
  import { createChatId } from "@/lib/utils";
  import Image from "next/image";
  import React from "react";

  type Params = Promise<{ id: string }>;

  const RealChatPage = async ({ params }: { params: Params }) => {

    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: { name: true, image: true },
    });

    const messages = await getMesssages(id);

    const session = await auth();

    if (!session?.user) {
      return { status: 401, formattedMessage: [] };
    }

    const chatId= createChatId(session.user.id!, id);

    // console.log('mmafafa', messages);
    
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Chat Header */}
        <header className="bg-slate-300 rounded-lg shadow-md p-4 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-300 flex items-center justify-center text-gray-500 font-bold rounded-full">
                {user?.name?.[0]?.toUpperCase() || "?"}
                
              </div>
            )}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{user?.name || "Unknown User"}</h1>
          </div>
          <div className="relative pl-3 pt-3">
          <PresenceDot id={id} /> 
          </div>
          
        </header>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-4">
          {/* Example messages */}
          <MessageList initialMessages={messages} userId={session.user.id!} chatId={chatId} />
        </div>

        {/* Chat Input */}
        <div className="bg-white p-4 border-t sticky bottom-0">
          <ChatForm id={id} />
        </div>
      </div>
    );
  };

  export default RealChatPage;
