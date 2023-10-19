import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { getCurrentSong } from "@/lib/spotify";
import { refreshSpotifyAccessToken } from "@/server/auth";

export const spotifyRouter = createTRPCRouter({
  getCurrentTrack: protectedProcedure.query(({ ctx }) => {
    return getCurrentSong(ctx.session.user.jwt.accessToken).catch((error) => {
      if (error === 401) {
        return refreshSpotifyAccessToken(ctx.session.user.jwt).then(
          (newToken) => getCurrentSong(newToken.accessToken),
        );
      }
      throw error;
    });
  }),
  getMessageHistory: protectedProcedure
    .input(z.object({ songId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.message.findMany({
        where: { songId: input.songId },
        take: 10,
        orderBy: { createdAt: "desc" },
      });
    }),
});
