import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PublicKeys {
  key: string;
  wsHost: string;
  wsPort: number;
  wssPort: number;
}
