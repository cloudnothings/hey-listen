import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google"
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import GlobalNav from "@/components/nav/global-nav";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <TRPCReactProvider headers={headers()}>
          <Providers>
            <GlobalNav />
            {children}
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
