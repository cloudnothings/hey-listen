"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import MessageList from "./message-list";
import { ChatInput } from "./chat-input";
import { useQuery } from "@tanstack/react-query";
import { getCurrentTrack } from "@/app/_components/current-track.action";
import type { PublicKeys } from "@/lib/utils";

export default function ChatboxContainer({ publicKeys }: { publicKeys: PublicKeys }) {
  const songQuery = useQuery(["spotify.getCurrentTrack"], () => getCurrentTrack())
  const songId = songQuery.data?.item?.id
  if (!songId) return null
  return (
    <Card >
      <CardHeader>
        <CardTitle className="text-center">Talk with others listening to this song</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[40vh]">
          <MessageList songId={songId} publicKeys={publicKeys} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="pb-10">
        <ChatInput songId={songId} />
      </CardFooter>
    </Card>
  )
}


