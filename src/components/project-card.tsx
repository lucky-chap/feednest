"use client";

import React from "react";
import { Button } from "./ui/button";
import { Calendar, Link2, Trash } from "lucide-react";
import Link from "next/link";
import { IProject } from "@/lib/types";
import Timeago from "react-timeago";

export default function ProjectCard({ project }: { project: IProject }) {
  return (
    <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 shadow-none">
      <div className="flex flex-col space-y-4 bg-white px-4 py-8">
        <h5 className="text-lg font-medium">{project.name}</h5>
        <a
          href={project.website}
          rel="noreferrer"
          target="_blank"
          className="group flex items-center text-sm font-medium"
        >
          <Link2
            size={15}
            className="mr-1 text-zinc-400 group-hover:text-zinc-600"
          />
          <span className="text-zinc-400 group-hover:text-zinc-600">
            {project.website}
          </span>
        </a>
        <p className="flex items-center text-sm text-zinc-400">
          <Calendar size={15} className="mr-1 text-zinc-400" />
          <Timeago date={project._creationTime} />
        </p>
      </div>

      <div className="flex flex-row items-center justify-between bg-zinc-50 p-4 text-center">
        <Link href={`/console/${project._id}`} className="w-full">
          <Button
            variant={"outline"}
            className="w-full rounded-full text-zinc-500 hover:text-zinc-600"
          >
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
