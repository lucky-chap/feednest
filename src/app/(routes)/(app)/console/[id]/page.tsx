"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePaginatedQuery, useQuery, useMutation } from "convex/react";
import { gql, useLazyQuery } from "@apollo/client";
import Feedback from "@/components/feedback";
import { Button } from "@/components/ui/button";
import { Loader2, Settings, Trash } from "lucide-react";
import React from "react";
import { api } from "../../../../../../convex/_generated/api";
import CodeDialog from "@/components/code-dialog";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { IFeedback } from "@/lib/types";
import ProjectSettings from "@/components/project-settings";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startSearch, setStartSearch] = useState(false);
  const [parsedFeedback, setParsedFeedback] = useState<IFeedback[]>([]);
  const project = useQuery(api.project.fetchSingleProject, {
    id: params.id as any,
  });
  const updateProject = useMutation(api.project.updateProject);
  const deletePorject = useMutation(api.project.deleteProject);

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.feedback.fetchFeedbackForProject,
    {
      projectId: params.id as Id<"projects">,
    },
    { initialNumItems: 15 },
  );
  const [summary, setSummary] = useState(project?.summary);
  const [suggestions, setSuggestions] = useState(project?.suggestions);

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

  const SummariseFeedbackQuery = gql`
    query SummariseFeedback($feedback: [String!]!) {
      summariseFeedback(feedback: $feedback) {
        summary
        suggestions
      }
    }
  `;

  const [search, { loading, error, data }] = useLazyQuery(SearchFeedbackQuery, {
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYPERMODE_API_KEY}`,
      },
    },
    skipPollAttempt: () => !startSearch,
    variables: {
      text: searchTerm,
      collection: "feedback",
      maxItems: 15,
      projectId: params.id,
    },
    onCompleted: (data) => {
      console.log("Search results", data.search.objects);
      // map over each object, get the text and
      // use JSON to parse it, then store the parsed
      // object in parsedFeedback
      const parsed = data.search.objects.map((obj: any) =>
        JSON.parse(obj.text),
      );
      setParsedFeedback(parsed);
      console.log("Search error", error);
      setStartSearch(false);
      if (data.search.status !== "success") {
        if (data.search.error === "Text is empty.") {
          return;
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: `${data.search.error}`,
          });
        }
      }
    },
  });

  const [summariseFeedback, { loading: summaryLoading }] = useLazyQuery(
    SummariseFeedbackQuery,
    {
      context: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYPERMODE_API_KEY}`,
        },
      },
      skipPollAttempt: () => !startSearch,
      variables: {
        feedback: results.map((feedback) => feedback.content), // return only the content of the feedback,
      },
      onCompleted: async (data) => {
        setSummary(data.summariseFeedback.summary);
        setSuggestions(data.summariseFeedback.suggestions);
        // update project summary and suggestions in convex

        const status = await updateProject({
          projectId: params.id as Id<"projects">,
          name: project?.name as string,
          website: project?.website as string,
          summary: data.summariseFeedback.summary,
          suggestions: data.summariseFeedback.suggestions,
        });

        if (status === "updated") {
          return;
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description:
              "An error occurred while storing summary and suggestions.",
          });
        }

        console.log("Summarised feedback", summary);
        console.log("Suggestions", suggestions);
      },
    },
  );

  const handleFeedbackSearch = async () => {
    setStartSearch(true);
    await search();
  };

  const handleSummariseFeedback = async () => {
    await summariseFeedback();
  };

  const handleDeletProject = async () => {
    setDeleting(true);
    const status = await deletePorject({
      projectId: params.id as Id<"projects">,
    });

    if (status === "deleted") {
      setDeleting(false);
      router.push("/console");
      toast({
        variant: "default",
        title: "Project deleted.",
        description: "Your project has been deleted successfully.",
      });
    } else {
      setDeleting(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while deleting the project.",
      });
    }
  };

  // console.log("Summary", project?.summary);

  return (
    <div className="mx-auto max-w-5xl px-5 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="mr-2 font-medium">
            <span className="text-zinc-500">Feedback for</span> {project?.name}
          </h2>
          <span className="me-2 rounded-full bg-blue-200 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            {results.length} in total
          </span>
        </div>
        <div className="flex items-center">
          <CodeDialog projectId={params.id as Id<"projects">} />
          <ProjectSettings project={project} />
          <Button
            disabled={deleting}
            onClick={() => handleDeletProject()}
            variant={"outline"}
            className="h-auto rounded-full p-2"
          >
            <Trash size={15} className="text-zinc-400" />
          </Button>
        </div>
      </div>
      <section className="mx-auto my-12 max-w-3xl">
        {/* ai summary and suggestions section */}
        <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-zinc-500 shadow shadow-zinc-100">
          {/* ai summary */}
          {project == undefined ? (
            <Loader2 className="flex h-7 w-full animate-spin items-center justify-center text-zinc-500" />
          ) : (
            <>
              {project?.summary?.length! > 0 ? (
                <div className="">
                  <h2 className="font-medium text-zinc-600">AI Summary</h2>
                  <p className="my-4 leading-7">{project?.summary}</p>
                </div>
              ) : (
                <div className="">
                  <h2 className="font-medium text-zinc-600">AI Summary</h2>
                  <p className="my-4 leading-7">
                    No AI summary available for this project yet.
                  </p>
                </div>
              )}

              {/* ai suggestions */}
              {project?.suggestions?.length! > 0 ? (
                <div className="">
                  <h2 className="font-medium text-zinc-600">AI Suggestions</h2>

                  <p className="my-4 leading-7">{project?.suggestions}</p>
                  <Button
                    disabled={summaryLoading}
                    onClick={() => handleSummariseFeedback()}
                    className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {summaryLoading ? (
                      <Loader2 className="h-7 w-7 animate-spin text-white" />
                    ) : null}
                    {summaryLoading ? "Regenerating" : "Regnerate"}
                  </Button>
                </div>
              ) : (
                <div className="">
                  <h2 className="font-medium text-zinc-600">AI Suggestions</h2>

                  <p className="my-4 leading-7">
                    No AI suggestions available for this project yet.
                  </p>
                  <Button
                    disabled={summaryLoading || results.length === 0}
                    onClick={() => handleSummariseFeedback()}
                    className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {summaryLoading ? (
                      <Loader2 className="h-7 w-7 animate-spin text-white" />
                    ) : null}

                    {summaryLoading ? "Generating" : "Generate"}
                  </Button>
                </div>
              )}
            </>
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

        {parsedFeedback.length > 0 && (
          <div className="">
            <h4 className="mb-6 text-xl font-medium">Search results</h4>
            {parsedFeedback.map((feedback) => (
              <Feedback
                key={feedback._id}
                feedback={feedback}
                isSearch={true}
              />
            ))}
          </div>
        )}

        {parsedFeedback.length == 0 &&
          results.map((feedback) => (
            <Feedback key={feedback._id} feedback={feedback} isSearch={false} />
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

        {searchTerm.length == 0 && status === "CanLoadMore" && (
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
