import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import { env } from "@/env.mjs";
import { db } from "@/server/db";

interface Token {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
}
interface RefreshTokenResponse {
  access_token: string;
  expires_at: number;
  refresh_token: string;
}
interface SpotifyProfile {
  display_name: string;
  email: string;
  id: string;
  uri: string;
}
export async function refreshSpotifyAccessToken(token: Token) {
  try {
    const body = new URLSearchParams({
      refresh_token: token.refreshToken,
      grant_type: "refresh_token",
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
        ).toString("base64")}`,
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error("RefreshAccessTokenError");
    }

    const data = (await response.json()) as RefreshTokenResponse;
    const oneHourFromNow = Date.now() + 1000 * 60 * 60;
    const result = {
      ...token,
      accessToken: data.access_token,
      expiresAt: oneHourFromNow,
      refreshToken: data.refresh_token ?? token.refreshToken,
    };
    return result;
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      jwt: {
        accessToken: string;
        expiresAt: number;
        refreshToken: string;
      };
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, account, profile }) {
      if (account && profile) {
        return {
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          refreshToken: account.refresh_token,
          profile: {
            ...profile,
          },
          userId: token.sub,
        };
      }
      if ((token.expiresAt as number) - Date.now() > 15 * 60 * 1000) {
        console.log("Not refreshing token");
        return token;
      }
      console.log("Refreshing token");
      return refreshSpotifyAccessToken(token as unknown as Token);
    },
    session({ session, token }) {
      const profile = token.profile as SpotifyProfile;
      const userId = token?.userId;
      if (session) {
        if (token?.accessToken && token.expiresAt && token.refreshToken) {
          session.user.jwt = {
            accessToken: token.accessToken as string,
            expiresAt: token.expiresAt as number,
            refreshToken: token.refreshToken as string,
          };
        }
        if (profile) {
          session.user.id = userId as string;
          session.user.email = profile.email;
          session.user.name = profile.display_name;
          session.user.image = profile.uri;
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "user-read-email,user-read-currently-playing,playlist-read-private,playlist-read-collaborative,user-top-read,user-read-recently-played,user-library-read",
        },
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
