"use server";
import { db } from "@/server/db";

export async function getMessages(songId: string) {
  const response = await db.message.findMany({
    where: { songId },
    take: 100,
    orderBy: { createdAt: "desc" },
  });
  return response;
}
