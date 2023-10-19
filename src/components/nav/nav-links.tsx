"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex">
      <Link href="/" className="flex items-center space-x-2 md:mr-6">
        <Icons.logo className="w-6 h-6" />
        <span className="hidden font-bold sm:inline-block">
          Hey Listen
        </span>
      </Link>
      <nav className="items-center hidden space-x-6 text-sm font-medium md:flex">
        <Link
          href="/about"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/about" ? "text-foreground" : "text-foreground/60"
          )}
        >
          About
        </Link>
      </nav>
    </div>
  )
}