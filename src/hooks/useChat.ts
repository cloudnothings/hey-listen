import { useEffect, useState } from "react";
import PusherJS from "pusher-js";
import type { Message } from "@prisma/client";
import type { PublicKeys } from "@/lib/utils";

export type ChatBoxMessage = Message;
const DEFAULT_EVENT = "chat-event";
export default function useChat(publicKeys: PublicKeys, songId: string) {
  const [chats, setChats] = useState<ChatBoxMessage[]>([]);
  useEffect(() => {
    const pusher = new PusherJS(publicKeys.key, {
      wsHost: publicKeys.wsHost,
      wsPort: publicKeys.wsPort,
      wssPort: publicKeys.wssPort,
      cluster: "mt1",
      forceTLS: true,
      enabledTransports: ["ws", "wss"],
    });
    const channel = pusher.subscribe(songId);
    channel.bind(DEFAULT_EVENT, function (data: ChatBoxMessage) {
      setChats((prevState) => [data, ...prevState]);
    });
    return () => {
      pusher.unsubscribe(songId);
    };
  }, [publicKeys, songId]);
  useEffect(() => {
    setChats([]);
  }, [songId]);
  return { chats };
}
