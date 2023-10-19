"use client"

import type { Message } from "@prisma/client";
import MessageItem from "./message-item";
import useChat from "@/hooks/useChat";
import { getMessages } from "./getMessages";
import { useQuery } from "@tanstack/react-query";
import type { PublicKeys } from "@/lib/utils";

export default function MessageList({ songId, publicKeys }: { songId: string, publicKeys: PublicKeys }) {
  const chatsQuery = useQuery(["chat.getChat", songId], () => getMessages(songId), { refetchOnWindowFocus: false, refetchOnMount: true })
  const messages = chatsQuery.data ?? [] as Message[]
  const { chats: newChats } = useChat(publicKeys, songId)
  const chats = [...newChats, ...messages]

  return (
    <div className="flex flex-col gap-2 max-w-[95vw] ">
      {chats.map((chat, index) => (
        <MessageItem key={index} message={chat.body} createdAt={chat.createdAt} />
      ))}
    </div>
  )
}