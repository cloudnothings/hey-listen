import CurrentTrack from "./CurrentTrack";
import { env } from "@/env.mjs";
import ChatboxContainer from "@/components/chatbox/chatbox-container";
import type { PublicKeys } from "@/lib/utils";

function getPublicKeys() {
  return {
    key: env.SOKETI_APP_KEY,
    wsHost: env.SOKETI_HOST,
    wsPort: parseInt(env.SOKETI_PORT),
    wssPort: parseInt(env.SOKETI_PORT),
  } as PublicKeys
}
const HomePage = () => {
  const publicKeys = getPublicKeys();

  return (
    <div className="max-h-[calc(100vh-64px)]">
      {/* small */}
      <div className="p-4 flex flex-col gap-4 w-full lg:hidden">
        <div className="flex w-full">
          <CurrentTrack />
        </div>
        <div className="w-full">
          <ChatboxContainer publicKeys={publicKeys} />
        </div>
      </div>
      {/* big */}
      <div className="gap-4 p-4 hidden lg:flex ">
        <div className="flex max-w-2xl">
          <CurrentTrack />
        </div>
        <div className="w-full">
          <ChatboxContainer publicKeys={publicKeys} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
