interface Track {
  name: string;
  uri: string;
  id: string;
  disc_number: number;
  duration_ms: number;
  explicit: false;
  href: string;
  is_local: false;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  artists: Artist[];
  album: Album;
  external_urls: {
    spotify: string;
  };
}
interface Artist {
  name: string;
  uri: string;
  id: string;
  external_urls: {
    spotify: string;
  };
}
interface Album {
  id: string;
  name: string;
  uri: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  images: {
    url: string;
    height: number;
    width: number;
  }[];
}
interface Response {
  timestamp: number;
  context: {
    href: string;
    type: string;
    uri: string;
  };
  progress_ms: number;
  item: Track | null;
  currently_playing_type: string;
  is_playing: true;
}

export async function getCurrentSong(accessToken: string) {
  // https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    if (response.status === 429) {
      // Rate limit exceeded
      const retryAfter = response.headers.get("retry-after");
      if (retryAfter) {
        const seconds = parseInt(retryAfter, 10);
        if (!isNaN(seconds)) {
          throw new Error(`Rate limit exceeded, retry in ${seconds} seconds`);
        }
      }
    }
    throw new Error(`HTTP error ${response.status} ${response.statusText}`);
  }
  if (response.status === 204) {
    return null;
  }

  const data = (await response.json()) as Response;
  return data;
}
