import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center pt-48 w-full">
      <div className="text-2xl">This page was made just for fun.</div>
      <Link href={'https://rangel.us'} target="_blank">My personal site</Link>
    </div>
  )
}