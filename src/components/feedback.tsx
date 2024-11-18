"use client";

import { RotateCcw, Settings, StarIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function Feedback() {
  return (
    <article>
      <section className="flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center">
            <h2 className="mr-2 font-medium">Jake Allan</h2>
            <span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Praise
            </span>
          </div>
          <div className="flex items-center">
            <span className="py-1 text-xs text-zinc-500">2 days ago</span>
            <span className="mx-3 h-1 w-1 rounded-full bg-zinc-400"></span>
            <span className="py-1 text-xs text-zinc-500">
              🏳️‍🌈 Ontario, Canada
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <StarIcon className="mr-1 h-5 w-5 fill-zinc-400 text-zinc-400" />
          <span className="text-xs">3</span>
        </div>
      </section>
      <section>
        <p className="my-2 text-sm leading-7 text-zinc-700">
          Absolutely love the Mower3000! Installation was a breeze, thanks to
          the clear instructions and videos. It navigates my complex yard with
          ease, even the steep parts. Plus, it's so quiet, I barely notice it's
          working. Truly a game-changer for lawn care.
        </p>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Button
              variant={"outline"}
              className="mr-2 h-auto rounded-full p-1"
            >
              <RotateCcw size={11} className="text-zinc-400" />
            </Button>
            <p className="text-zinc-500">Pending</p>
          </div>
          <span className="italic text-zinc-500">Positive</span>
        </div>
      </section>
    </article>
  );
}
