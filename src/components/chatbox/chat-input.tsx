"use client"

import { useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"
import { sendMessageToSong } from "@/actions/sendMessage"

export function ChatInput({ songId }: { songId: string }) {
  const [message, setMessage] = useState("")
  useEffect(() => {
    // if key is enter, send message
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        if (message.trim() === "") return
        sendMessageToSong(message, songId).catch(console.error)
        setMessage("")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [message, songId])

  return (
    <form className="w-full h-[50px]" action={() => sendMessageToSong(message, songId)}>
      <Textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)} />
    </form>
  )
}