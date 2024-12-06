import { getMesssages } from "@/actions/messageActions";
import { ChatForm } from "@/components/chat/chat-form";
import { prisma } from "@/lib/prisma";
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

  console.log('mmafafa', messages);
  
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
      </header>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {/* Example messages */}
        <div className="mb-4 flex flex-col items-start">
          <div className="bg-blue-500 text-white rounded-lg p-3 w-fit max-w-xs shadow">
            Hello! How are you?
          </div>
          <span className="text-gray-400 text-xs mt-1">You - 10:30 AM</span>
        </div>
        <div className="mb-4 flex flex-col items-end">
          <div className="bg-gray-200 rounded-lg p-3 w-fit max-w-xs shadow">
            I'm good, thanks! What about you?
          </div>
          <span className="text-gray-400 text-xs mt-1">Other User - 10:32 AM</span>
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white p-4 border-t sticky bottom-0">
        <ChatForm id={id} />
      </div>
    </div>
  );
};

export default RealChatPage;
