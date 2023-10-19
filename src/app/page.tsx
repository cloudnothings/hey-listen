import { getServerAuthSession } from "@/server/auth";
import LandingPage from "./_components/LandingPage";
import HomePage from "./_components/HomePage";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session) return <LandingPage />;
  return (
    <HomePage />
  );
}
