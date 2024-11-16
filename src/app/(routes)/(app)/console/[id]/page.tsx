import { Button } from "@/components/ui/button";
import { Settings, Star, StarIcon, Trash } from "lucide-react";
import React from "react";

export default function ProjectPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="mr-2 font-medium">Feedback for PROJECT GQL</h2>
          <span className="me-2 rounded-full bg-blue-200 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            21 in total
          </span>
        </div>
        <div className="flex items-center">
          <Button variant={"outline"} className="mr-2 h-auto rounded-full p-2">
            <Settings size={15} className="text-zinc-400" />
          </Button>
          <Button variant={"outline"} className="h-auto rounded-full p-2">
            <Trash size={15} className="text-zinc-400" />
          </Button>
        </div>
      </div>
      {/* main section */}
      <section className="mx-auto my-10 max-w-4xl">
        {/* summary section */}
        <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-zinc-500 shadow shadow-zinc-100">
          <h2 className="font-medium text-zinc-600">AI Summary</h2>
          <p className="my-2 text-xs">Based on 10 customer ratings</p>
          <div className="mx-auto flex max-w-[15rem] items-center justify-around rounded-full bg-zinc-100 p-2">
            <div className="flex items-center">
              <StarIcon className="mr-1 h-5 w-5 fill-zinc-400 text-zinc-400" />
              <StarIcon className="mr-1 h-5 w-5 fill-zinc-400 text-zinc-400" />
              <StarIcon className="mr-1 h-5 w-5 fill-zinc-400 text-zinc-400" />
              <StarIcon className="mr-1 h-5 w-5 text-zinc-400" />
              <StarIcon className="mr-1 h-5 w-5 text-zinc-400" />
            </div>
            <p>
              <span className="font-medium">3</span> out of 5
            </p>
          </div>
          {/* ai summary */}
          <p className="mt-2 leading-7">
            Customers find the Mower3000 reliable for flat lawns, praising its
            quiet operation and autonomous features. However, some encounter
            issues on slopes and uneven cuts, as well as complications during
            setup and app usage. The overall rating reflects a neutral sentiment
            with areas for improvement.
          </p>
        </div>
      </section>
    </div>
  );
}
