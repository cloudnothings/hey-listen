"use client"

import { useQuery } from "@tanstack/react-query"
import { getCurrentTrack } from "./current-track.action"
import type { PublicKeys } from "@/lib/utils"

const SongChat = ({ children }: { publicKeys: PublicKeys, children: React.ReactNode }) => {
  const songQuery = useQuery(["spotify.getCurrentTrack"], () => getCurrentTrack(), {
    refetchInterval: 5000,
  })
  if (songQuery.isLoading) return <div>Loading...</div>
  if (!songQuery.data) {
    return (
      <span>
        We were unable to retreive the current song. Please try again later, or try signing out then signing back in.
      </span>
    )
  }
  if (!songQuery.data.is_playing) return <span>No song is currently playing.</span>

  return (
    <>
      {children}
    </>
  )
}

export default SongChat
