"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { getCurrentTrack } from "./current-track.action";
import { Button } from "@/components/ui/button";

const CurrentTrack = () => {
  const songQuery = useQuery(["spotify.getCurrentTrack"], () => getCurrentTrack(), {
    refetchInterval: 5000,
  })
  if (songQuery.isLoading) return <Label>Loading...</Label>
  if (!songQuery.data) return (
    <div className="flex flex-col justify-center items-center w-full py-36">
      <div className="text-4xl font-bold">Nothing playing</div>
      <Button className="mt-4" onClick={() => songQuery.refetch()}>Retry</Button>
    </div>
  )

  return (
    <Card className="w-full lg:w-auto">
      <CardHeader>
        <CardTitle>
          <div>Current Track</div>
        </CardTitle>
        <CardContent className="w-full flex gap-4">
          <div className="w-32 lg:w-full">
            <Link href={songQuery.data.item?.album.external_urls.spotify ?? ''} target="_blank">
              <Image src={songQuery?.data.item?.album?.images[0]?.url ?? ""}
                width={songQuery?.data.item?.album?.images[0]?.width}
                height={songQuery?.data.item?.album?.images[0]?.height}
                alt={songQuery.data?.item?.album?.name ?? ""}
              />
            </Link>
          </div>
          <div className="w-full flex flex-col justify-between lg:hidden">
            <Label className="text-xl">
              <Link href={songQuery.data.item?.external_urls.spotify ?? ''} target="_blank">
                {songQuery?.data.item?.name}
              </Link>
            </Label>
            <Label>
              <Link href={songQuery.data.item?.artists[0]?.external_urls.spotify ?? ''}>
                {songQuery?.data.item?.artists[0]?.name}
              </Link>
            </Label>
            <Label >
              <Link href={songQuery.data.item?.artists[0]?.external_urls.spotify ?? ''}>
                {songQuery?.data.item?.album?.name}
              </Link>
            </Label>
          </div>
        </CardContent>
        <CardFooter className="hidden lg:block">
          <div className="w-full flex flex-col justify-between gap-2">
            <Label className="text-xl">
              <Link href={songQuery.data.item?.external_urls.spotify ?? ''} target="_blank">
                {songQuery?.data.item?.name}
              </Link>
            </Label>
            <Label className="text-md">
              <Link href={songQuery.data.item?.artists[0]?.external_urls.spotify ?? ''}>
                {songQuery?.data.item?.artists[0]?.name}
              </Link>
            </Label>
            <Label className="text-md" >
              <Link target="_blank" href={songQuery.data.item?.artists[0]?.external_urls.spotify ?? ''}>
                {songQuery?.data.item?.album?.name}
              </Link>
            </Label>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  )
}

export default CurrentTrack