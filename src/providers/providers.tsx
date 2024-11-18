"use client";

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexAuthNextjsProvider client={convex}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        {/* <OneTapComponent googleClientID={process.env.AUTH_GOOGLE_ID!} /> */}
        <Toaster />
      </ThemeProvider>
    </ConvexAuthNextjsProvider>
  );
}
