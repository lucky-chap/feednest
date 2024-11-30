"use client";

import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import {
  Badge,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Code,
  Code2,
  Copy,
  Slash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CodeDialog({ projectId }: { projectId: string }) {
  const user = useQuery(api.user.viewer);

  const [npmCopied, setNPMCopied] = useState(false);
  const [importCopied, setImportCopied] = useState(false);
  const [useCopied, setUseCopied] = useState(false);

  const handleNPMCopy = () => {
    if (projectId) {
      navigator.clipboard.writeText(
        "npm install feednest @apollo/client graphql",
      );
      setNPMCopied(true);
      setTimeout(() => {
        setNPMCopied(false);
      }, 1000);
    }
  };

  const handleImportCopy = () => {
    if (projectId) {
      navigator.clipboard.writeText(
        "import { FeedbackWidget, client } from 'feednest' \nimport { ApolloProvider } from '@apollo/client'",
      );
      setImportCopied(true);
      setTimeout(() => {
        setImportCopied(false);
      }, 1000);
    }
  };

  const handleUseCopy = () => {
    if (projectId) {
      navigator.clipboard.writeText(
        `<ApolloProvider client={client}> \n<FeedbackWidget projectId={${projectId}} /> \n// your other react components \n</ApolloProvider>`,
      );
      setUseCopied(true);
      setTimeout(() => {
        setUseCopied(false);
      }, 1000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-auto rounded-full p-2 text-xs">
          <Code size={14} className="text-zinc-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="">Using Feednest on your website</DialogTitle>
          <DialogDescription className="pt-3">
            You can use the Feednest component in your project by following the
            steps below
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-end space-x-2">
          <div className="grid flex-1 gap-2">
            <div className="flex items-end justify-between">
              <Card className="w-full border-none shadow-none">
                <CardHeader className="p-0">
                  <h2 className="text-sm font-medium">Install Feednest</h2>
                </CardHeader>
                <CardContent className="mt-3 flex w-full items-center rounded-md bg-zinc-100 p-0 font-medium">
                  <pre className="w-full rounded-md p-2 text-sm">
                    <code className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      <p className="font-medium text-green-600">npm</p> install
                      feednest @apollo/client graphql
                    </code>
                  </pre>
                </CardContent>
              </Card>
              <Button
                variant={"secondary"}
                size="sm"
                className="ml-1 px-3"
                onClick={handleNPMCopy}
              >
                <span className="sr-only">Copy</span>
                {npmCopied ? (
                  <span className="sr-only">Copied</span>
                ) : (
                  <span className="sr-only">Copy</span>
                )}
                {npmCopied ? (
                  <ClipboardCheck className="ml-1 h-4 w-4" />
                ) : (
                  <Copy className="ml-1 h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Card className="mt-3 w-full border-none shadow-none">
                <CardHeader className="p-0">
                  <h2 className="text-sm font-medium">Import packages</h2>
                </CardHeader>
                <CardContent className="mt-3 flex w-full flex-col items-center rounded-md bg-zinc-100 p-0 font-medium">
                  <pre className="w-full rounded-md p-2 text-sm">
                    <code className="flex items-center">
                      <p className="text-purple-600">import</p>{" "}
                      <span className="px-1 text-amber-400">{`{ `}</span>
                      <span className="text-red-600">{`FeedbackWidget, client`}</span>
                      <span className="px-1 text-amber-400">{` }`}</span>
                      <p className="pr-2 text-purple-600">from</p>{" "}
                      <p className="text-green-600">"feednest"</p>{" "}
                    </code>
                  </pre>
                  <pre className="w-full rounded-md p-2 text-sm">
                    <code className="flex items-center">
                      <p className="text-purple-600">import</p>{" "}
                      <span className="px-1 text-amber-400">{`{ `}</span>
                      <span className="text-red-600">{`ApolloProvider`}</span>
                      <span className="px-1 text-amber-400">{` }`}</span>
                      <p className="pr-2 text-purple-600">from</p>{" "}
                      <p className="text-green-600">"@apollo/client"</p>{" "}
                    </code>
                  </pre>
                </CardContent>
              </Card>
              <Button
                variant={"secondary"}
                size="sm"
                className="ml-1 mt-2 px-3"
                onClick={handleImportCopy}
              >
                <span className="sr-only">Copy</span>
                {importCopied ? (
                  <span className="sr-only">Copied</span>
                ) : (
                  <span className="sr-only">Copy</span>
                )}
                {importCopied ? (
                  <ClipboardCheck className="ml-1 h-4 w-4" />
                ) : (
                  <Copy className="ml-1 h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-end justify-between">
              <Card className="mt-3 w-full border-none shadow-none">
                <CardHeader className="p-0">
                  <h2 className="text-sm font-medium">
                    Import CSS styling at the top of your page
                  </h2>
                </CardHeader>
                <CardContent className="mt-3 flex w-full items-center rounded-md bg-zinc-100 p-0 font-medium">
                  <pre className="w-full rounded-md p-2 text-sm">
                    <code className="flex items-center">
                      <p className="text-purple-600">import </p>{" "}
                      <p className="text-green-600">
                        "feednest/dist/index.css"
                      </p>{" "}
                    </code>
                  </pre>
                </CardContent>
              </Card>
              <Button
                variant={"secondary"}
                size="sm"
                className="mb-1 ml-1 px-3"
                onClick={handleImportCopy}
              >
                <span className="sr-only">Copy</span>
                {importCopied ? (
                  <span className="sr-only">Copied</span>
                ) : (
                  <span className="sr-only">Copy</span>
                )}
                {importCopied ? (
                  <ClipboardCheck className="ml-1 h-4 w-4" />
                ) : (
                  <Copy className="ml-1 h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Card className="mt-3 w-full rounded-md border-none shadow-none">
                <CardHeader className="p-0">
                  <h2 className="text-sm font-medium">Use it like this</h2>
                </CardHeader>
                <CardContent className="mt-3 flex w-full flex-col items-center rounded-md bg-zinc-100 p-0 font-medium">
                  <pre className="w-full rounded-md bg-zinc-100 p-2 text-sm text-zinc-300">
                    <code className="flex items-center">
                      <p className="text-purple-600">
                        <ChevronLeft className="-mr-1 h-4 w-4" />
                      </p>{" "}
                      <span className="-pl-3 pr-2 text-amber-600">
                        ApolloProvider
                      </span>
                      <p className="text-blue-500">client=</p>
                      <span className="rounded bg-zinc-200 px-2 py-[2px] text-zinc-400 md:hidden">
                        {`{client}`}
                      </span>
                      <span className="hidden rounded bg-zinc-200 px-2 py-[2px] text-zinc-400 md:block">
                        {`{client}`}
                      </span>
                      <p className="flex items-center text-purple-600">
                        {"/"}
                        <ChevronRight className="-mr-1 h-4 w-4" />
                      </p>{" "}
                    </code>
                  </pre>
                  <pre className="w-full rounded-md bg-zinc-100 px-2 text-sm text-zinc-300">
                    <code className="flex items-center">
                      <p className="text-purple-600">
                        <ChevronLeft className="-mr-1 h-4 w-4" />
                      </p>{" "}
                      <span className="-pl-3 pr-2 text-amber-600">
                        FeedbackWidget
                      </span>
                      <p className="text-blue-500">projectId=</p>
                      <span className="rounded bg-zinc-200 px-2 py-[2px] text-zinc-400 md:hidden">
                        {projectId?.substring(0, 2) + "..."}
                      </span>
                      <span className="hidden rounded bg-zinc-200 px-2 py-[2px] text-zinc-400 md:block">
                        {projectId?.substring(0, 10) + "..."}
                      </span>
                      <p className="flex items-center text-purple-600">
                        {"/"}
                        <ChevronRight className="-mr-1 h-4 w-4" />
                      </p>{" "}
                    </code>
                    <span className="ml-3 text-zinc-500">
                      // your other react components
                    </span>
                  </pre>
                  <pre className="w-full rounded-md bg-zinc-100 p-2 text-sm text-zinc-300">
                    <code className="flex items-center">
                      <p className="text-purple-600">
                        <ChevronLeft className="-mr-1 h-4 w-4" />
                      </p>{" "}
                      <span className="-pl-3 pr-2 text-amber-600">
                        ApolloProvider
                      </span>
                      <p className="flex items-center text-purple-600">
                        {"/"}
                        <ChevronRight className="-mr-1 h-4 w-4" />
                      </p>{" "}
                    </code>
                  </pre>
                </CardContent>
              </Card>
              <Button
                variant={"secondary"}
                size="sm"
                className="mb-10 ml-1 px-3"
                onClick={handleUseCopy}
              >
                <span className="sr-only">Copy</span>
                {useCopied ? (
                  <span className="sr-only">Copied</span>
                ) : (
                  <span className="sr-only">Copy</span>
                )}
                {useCopied ? (
                  <ClipboardCheck className="ml-1 h-4 w-4" />
                ) : (
                  <Copy className="ml-1 h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <p className="text-xs text-zinc-600">
          NB: It is recommended to store your{" "}
          <span className="font-medium text-zinc-900">secrets</span> in an env
          file.
        </p>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="py-2">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
