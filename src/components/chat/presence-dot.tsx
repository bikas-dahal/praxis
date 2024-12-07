'use client';

import usePresenceStore from "@/hooks/chat/use-presence-store";
import React from "react";

type Props = {
  id: string;
};

export default function PresenceDot({ id }: Props) {
  const membersId = usePresenceStore((state) => state.membersIds);

  const isOnline = membersId.includes(id);

  if (!isOnline) return null;

  return (
    <div
      className="absolute top-0 right-2 w-4 h-4 bg-green-700 border-2 border-white rounded-full animate-pulse"
      aria-label="Online status"
    />
  );
}
