"use client";

import { MessageDto } from "@/types";
import React, { useRef, useEffect } from "react";
import clsx from "clsx";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, timeAgo } from "@/lib/utils";
import Image from "next/image";

type Props = {
  messages: MessageDto[];
  currentUserId: string;
};

export default function MessageBox({
    messages,
    currentUserId,
  }: Props) {
    const messageEndRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);
  
    // Debug logging
    // console.log('Current User ID:', currentUserId);
    // console.log('Messages:', JSON.stringify(messages, null, 2));
  
    if (!messages || messages.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          No messages yet
        </div>
      );
    }
  
    const renderMessage = (message: MessageDto) => {
      const isCurrentUserSender = message.senderId === currentUserId;
  
      // More detailed debug logging
    //   console.log('Message:', {
    //     isCurrentUserSender,
    //     senderId: message.senderId,
    //     currentUserId,
    //     senderImage: message.senderImage,
    //     receiverImage: message.receiverImage
    //   });
  
      const renderAvatar = () => {
        // Choose image based on sender/receiver

        // console.log('isSender:', isCurrentUserSender);
        
        
        const avatarSrc = isCurrentUserSender 
          ? message.senderImage 
          : message.senderImage;

        //   console.log('Avatar Src:', avatarSrc);
          
        
        const avatarAlt = isCurrentUserSender 
          ? message.senderName 
          : message.receiverName;
        
        // const avatarFallback = (isCurrentUserSender 
        //   ? message.senderName 
        //   : message.receiverName) || '?';
  
          return (
            <div className="flex items-center space-x-2">
                
              <Image src={avatarSrc || '/images/avatar.png'} alt={avatarAlt!} width={32} height={32} className="rounded-full" />
              {/* Debug display of actual image URLs */}
              {/* <div className="text-xs text-gray-500">
                <div>Sender Image: {message.senderImage}</div>
                <div>Receiver Image: {message.receiverImage}</div>
              </div> */}
            </div>
          );
        };

    const messageContentClasses = clsx(
      "flex flex-col max-w-[70%] min-w-[100px] px-3 py-2 rounded-xl shadow-sm",
      {
        "bg-sky-500 text-white self-end": isCurrentUserSender,
        "bg-pink-200 text-gray-900 self-start": !isCurrentUserSender,
      }
    );

    return (
      <div 
        className={clsx(
          "flex items-end gap-2 w-full",
          isCurrentUserSender ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          {renderAvatar()}
        </div>

        {/* Message Content Container */}
        <div 
          className={clsx(
            "flex flex-col",
            isCurrentUserSender ? "items-end" : "items-start"
          )}
        >
          {/* Sender Name and Timestamp */}
          <div 
            className={clsx(
              "text-xs text-gray-500 mb-1",
              isCurrentUserSender ? "text-right" : "text-left"
            )}
          >
            {isCurrentUserSender 
              ? "You" 
              : message.senderName || "Unknown"}
            {" · "}
            {message.createdAt ? timeAgo(message.createdAt) : ""}
            read {timeAgo(message.dateRead!)}
          </div>

          {/* Message Text */} 
          <div className={cn('flex gap-2')}>
            {/* <div className={cn(isCurrentUserSender ? 'block' : 'hidden')}>
                <Menu message={message} />
            </div> */}
          <div className={messageContentClasses}>
            <div className="text-sm break-words">
              {message.text || "No message content"} 
            </div>
          </div>
            {/* <div className={cn(isCurrentUserSender ? 'hidden' : 'block')}>
                <Menu message={message} />
            </div> */}
          </div>
        </div>
      </div>
    );
  };

//   const Menu = ({ message }: MessageDto) => {
//     return (
//         <div onClick={() => {
//             console.log();
//         }}>
//             ...
//         </div>
//     )
//   }

  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message, index) => (
        <React.Fragment key={message.id || index}>
          {renderMessage(message)}
            <div ref={messageEndRef} />
          
        </React.Fragment>
      ))}
    </div>
  );
}