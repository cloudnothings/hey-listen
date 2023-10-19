import { Input } from "../ui/input";

export function Search() {
  return (
    <div className="w-1/2">
      <Input
        type="search"
        placeholder="Search songs, artists, and albums"
        className="w-full"
      />
    </div>
  )
}