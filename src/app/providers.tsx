"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { TooltipProvider } from "@/components/ui/tooltip"
import { SessionProvider } from "next-auth/react"
import { ToastProvider } from "@/components/ui/toast"
interface Props extends ThemeProviderProps {
  children: React.ReactNode;
}

export function Providers({ children, }: Props) {
  return (
    <SessionProvider>
      <NextThemesProvider attribute='class'>
        <TooltipProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </TooltipProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </NextThemesProvider>
    </SessionProvider>
  )
}