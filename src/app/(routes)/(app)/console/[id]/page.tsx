"use client";

import { useState } from "react";
import {
  useAction,
  useMutation,
  usePaginatedQuery,
  useQuery,
} from "convex/react";
import { gql, useLazyQuery } from "@apollo/client";
import Feedback from "@/components/feedback";
import { Button } from "@/components/ui/button";
import { Loader2, Settings, Star, StarIcon, Trash } from "lucide-react";
import React from "react";
import { api } from "../../../../../../convex/_generated/api";
import CodeDialog from "@/components/code-dialog";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const project = useQuery(api.project.fetchSingleProject, {
    id: params.id as any,
  });

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.feedback.fetchFeedbackForProject,
    {
      projectId: params.id as Id<"projects">,
    },
    { initialNumItems: 15 },
  );

  const SearchFeedbackQuery = gql`
    query Search(
      $text: String!
      $collection: String!
      $maxItems: Int!
      $projectId: String!
    ) {
      search(
        text: $text
        collection: $collection
        maxItems: $maxItems
        projectId: $projectId
      ) {
        collection
        status
        error
        searchMethod
        objects {
          namespace
          key
          text
          labels
          distance
          score
        }
      }
    }
  `;

  const [search, { loading, error, data }] = useLazyQuery(SearchFeedbackQuery, {
    skipPollAttempt: () => false,
    variables: {
      text: searchTerm,
      collection: "feedback",
      maxItems: 15,
      projectId: params.id,
    },
    onCompleted: (data) => {
      // console.log("Search results", data);
      console.log("Search error", error);
      if (data.search.status !== "success") {
        toast({
          variant: "destructive",
          title: "Error",
          description: `${data.search.error}`,
        });
      }
    },
  });

  const handleFeedbackSearch = async () => {
    // if (searchTerm.trim().length === 0) {
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Search field cannot be empty",
    //   });
    //   return;
    // } else {
    // }
    await search();
  };

  console.log("Search results other", data);

  return (
    <div className="mx-auto max-w-5xl px-5 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="mr-2 font-medium">Feedback for {project?.name}</h2>
          <span className="me-2 rounded-full bg-blue-200 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            {results.length} in total
          </span>
        </div>
        <div className="flex items-center">
          <CodeDialog projectId={params.id as Id<"projects">} />
          <Button variant={"outline"} className="mx-2 h-auto rounded-full p-2">
            <Settings size={15} className="text-zinc-400" />
          </Button>
          <Button variant={"outline"} className="h-auto rounded-full p-2">
            <Trash size={15} className="text-zinc-400" />
          </Button>
        </div>
      </div>
      <section className="mx-auto my-12 max-w-3xl">
        {/* ai summary section */}
        <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-zinc-500 shadow shadow-zinc-100">
          <h2 className="font-medium text-zinc-600">AI Summary</h2>

          {/* ai summary */}
          {project?.summary && project.summary.length < 1 ? (
            <div className="">
              <p className="mt-4 leading-7">
                Customers find the Mower3000 reliable for flat lawns, praising
                its quiet operation and autonomous features. However, some
                encounter issues on slopes and uneven cuts, as well as
                complications during setup and app usage. The overall rating
                reflects a neutral sentiment with areas for improvement.
              </p>
              <Button className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Regenerate
              </Button>
            </div>
          ) : (
            <div className="">
              <p className="mt-4 leading-7">
                No AI summary available for this project yet.
              </p>
              <Button className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Generate
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* all feedback */}

      <div className="mx-auto mb-10 mt-20 max-w-3xl">
        {/* vector search for feedback */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFeedbackSearch();
          }}
        >
          <div className="mb-16 flex items-center justify-between">
            <Input
              type="text"
              placeholder="Search through feedback"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl focus-visible:ring-2 focus-visible:ring-zinc-100"
            />
            <Button
              disabled={loading || searchTerm.trim().length === 0}
              type="button"
              onClick={() => handleFeedbackSearch()}
              className="ml-3 h-10 rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Search
            </Button>
          </div>
        </form>

        {results.map((feedback) => (
          <Feedback key={feedback._id} feedback={feedback} />
        ))}
        {status === "Exhausted" && results.length === 0 && (
          <div className="grid place-content-center">
            <p className="text-zinc-600">No feedback yet</p>
          </div>
        )}

        {status === "LoadingMore" ||
          (status === "LoadingFirstPage" && (
            <div className="grid place-content-center">
              <Loader2 className="h-7 w-7 animate-spin text-zinc-400" />
            </div>
          ))}
        {!results && isLoading && (
          <div className="grid place-content-center">
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
