"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated } from "convex/react";

import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

import Link from "next/link";

// const navigation = [
//   { name: "Product", href: "#" },
//   { name: "Features", href: "#" },
//   { name: "Marketplace", href: "#" },
//   { name: "Company", href: "#" },
// ];

export default function Landing() {
  const { signIn } = useAuthActions();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <h2>Feednest</h2>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          {/* <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div> */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="https://github.com/lucky-chap/feednest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Source Code <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Handle user feedback like a pro
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Get the insights you need to make better product decisions. Do
                  it all in one place, with one tool. Get started for free.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Authenticated>
                    <Link href={"/console"}>
                      <Button
                        variant={"default"}
                        className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View console
                      </Button>
                    </Link>
                  </Authenticated>

                  <Unauthenticated>
                    <Button
                      onClick={() =>
                        void signIn("github", {
                          redirectTo: "/console",
                        })
                      }
                      variant={"default"}
                      className="rounded-full bg-zinc-900 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Login with Github
                    </Button>
                  </Unauthenticated>
                </div>
              </div>
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img
                    alt="App screenshot"
                    src="https://tailwindui.com/plus/img/component-images/project-app-screenshot.png"
                    width={2432}
                    height={1442}
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>

        {/* Logo cloud */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mt-16 flex justify-center">
            <p className="relative rounded-full px-4 py-1.5 text-xs leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20">
              <span className="hidden md:inline">
                Open Source Project built by{" "}
              </span>
              <a
                href="https://github.com/lucky-chap/feednest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-indigo-600"
              >
                <span aria-hidden="true" className="absolute inset-0" /> Huncho{" "}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
