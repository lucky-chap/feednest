"use client";

import ProjectCard from "@/components/project-card";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const user = useQuery(api.user.viewer);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    results,
    status,
    loadMore,
    isLoading: paginatedLoading,
  } = usePaginatedQuery(
    api.project.fetchProjects,
    {
      userId: user?._id,
      user_email: user?.email,
    },
    { initialNumItems: 10 },
  );

  // console.log("Results: ", results)
  // console.log("Userid: ", user?._id)

  const {
    results: searchResults,
    status: searchStatus,
    loadMore: searchLoadMore,
    isLoading: searchLoading,
  } = usePaginatedQuery(
    api.project.searchProjects,
    {
      userId: user?._id,
      searchTerm: searchTerm,
    },
    { initialNumItems: 10 },
  );

  return (
    <div className="py-3 md:px-20">
      <div className="flex items-center">
        <h2 className="mr-2 text-lg font-medium">Your projects</h2>
        <span className="me-2 rounded-full bg-blue-200 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          {results.length} in total
        </span>
      </div>
      <div className="py-10">
        {/* <ProjectCard /> */}
        <div className="grid gap-2 md:grid-cols-3">
          {results.map((project) => (
            <div className="">
              <ProjectCard key={project._id} project={project} />
            </div>
          ))}
        </div>

        {status === "Exhausted" && results.length === 0 && (
          <div className="grid h-[70vh] place-content-center">
            <p>No projects found</p>
          </div>
        )}

        {status === "LoadingMore" ||
          (status === "LoadingFirstPage" && (
            <div className="grid h-[70vh] place-content-center">
              <Loader2 className="h-7 w-7 animate-spin text-zinc-400" />
            </div>
          ))}
        {!results && paginatedLoading && (
          <div className="grid h-[70vh] place-content-center">
            <Loader2 className="h-7 w-7 animate-spin text-zinc-400" />
          </div>
        )}

        {status === "CanLoadMore" && (
          <div className="mx-auto max-w-sm px-3 pl-32">
            <Button
              onClick={() => loadMore(10)}
              className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
