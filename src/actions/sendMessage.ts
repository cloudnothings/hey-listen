"use server";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { soketi } from "@/server/soketi";
import { profanity } from "@2toad/profanity";

const DEFAULT_EVENT = "chat-event";

export async function sendMessageToSong(message: string, songId: string) {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("No session found");
  }
  if (!message) return;
  if (message.trim().length === 0) return;
  message = profanity.censor(message).trim();
  const now = new Date();
  await soketi.trigger(songId, DEFAULT_EVENT, {
    body: message,
    songId,
    userId: session.user.id,
    createdAt: now.toISOString(),
  });
  const request = {
    body: message,
    createdAt: now,
    songId,
    userId: session.user.id,
  };
  console.log(request);

  await db.message
    .create({
      data: {
        body: message,
        createdAt: now,
        userId: session.user.id,
        songId,
      },
    })
    .catch((error) => {
      console.error(error);
    });
}
