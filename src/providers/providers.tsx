"use client";

import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";
import { ApolloWrapper } from "@/lib/apollo";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexAuthNextjsProvider client={convex}>
      <ApolloWrapper>
        <Suspense>
          {children}
          <Toaster />
        </Suspense>
      </ApolloWrapper>
    </ConvexAuthNextjsProvider>
  );
}
