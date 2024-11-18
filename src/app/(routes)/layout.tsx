import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.css";
import Providers from "@/providers/providers";
import Script from "next/script";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

// const inter = Inter({ subsets: ["latin"] });

const inter = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "../../../public/fonts/Inter-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Inter-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Inter-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Inter-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Feednest",
  description: "Handle user feedback like a pro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
          <Script
            src="https://accounts.google.com/gsi/client"
            strategy="beforeInteractive"
          />
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
