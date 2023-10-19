"use server";

import { getCurrentSong } from "@/lib/spotify";
import { getServerAuthSession } from "@/server/auth";

export async function getCurrentTrack() {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("No session found");
  }
  return await getCurrentSong(session.user.jwt.accessToken).catch((error) => {
    console.error(error);
  });
}
