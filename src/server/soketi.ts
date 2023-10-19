import { env } from "@/env.mjs";
import Pusher from "pusher";

export const soketi = new Pusher({
  host: env.SOKETI_HOST,
  appId: env.SOKETI_APP_ID,
  key: env.SOKETI_APP_KEY,
  secret: env.SOKETI_APP_SECRET,
  cluster: "mt1",
  port: env.SOKETI_PORT,
  useTLS: true,
});
