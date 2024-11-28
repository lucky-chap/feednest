"use client";

import { RotateCcw, Settings, StarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Id } from "../../convex/_generated/dataModel";
import { IFeedback } from "@/lib/types";
import { IDEA, ISSUE, OTHER, PENDING, PRAISE, RESOLVED } from "@/lib/constants";
import ReactCountryFlag from "react-country-flag";
import { capitalizeFirstLetter } from "@/lib/utils";
import Timeago from "react-timeago";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Feedback({ feedback }: { feedback: IFeedback }) {
  const [loading, setLoading] = useState(false);

  const updateFeedbackStatusMutation = useMutation(
    api.feedback.updateFeedbackStatus,
  );

  const handleFeedbackStatus = async (status: string) => {
    setLoading(true);
    const result = await updateFeedbackStatusMutation({
      feedbackId: feedback._id,
      feedbackStatus: status,
    });
    if (result === "feedback_status_updated") {
      setLoading(false);
      toast({
        variant: "default",
        title: "Updated!",
        description: "Feedback status updated successfully",
      });
    } else {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Failure!",
        description: "Feedback status could not be updated",
      });
    }
  };
  return (
    <article className="pb-16">
      <section className="flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center">
            <h2 className="mr-2 font-medium">
              {feedback.by.trim().length === 0 ? "Anonymous" : feedback.by}
            </h2>
            {feedback.type.toLowerCase() === PRAISE && (
              <span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Praise
              </span>
            )}
            {feedback.type.toLowerCase() === ISSUE && (
              <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                Issue
              </span>
            )}
            {feedback.type.toLowerCase() === OTHER && (
              <span className="me-2 rounded bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">
                Other
              </span>
            )}
            {feedback.type.toLowerCase() === IDEA && (
              <span className="me-2 rounded bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                Idea
              </span>
            )}
          </div>
          <div className="flex items-center">
            <span className="py-1 text-xs text-zinc-500">
              <Timeago date={feedback._creationTime} />
            </span>
            <span className="mx-3 h-1 w-1 rounded-full bg-zinc-400"></span>
            <span className="py-1 text-xs text-zinc-500">
              <ReactCountryFlag
                countryCode={feedback.country_code}
                svg
                className="mr-2 text-base"
              />{" "}
              {feedback.location}
            </span>
          </div>
        </div>
        {/* <div className="flex items-center">
          <StarIcon className="mr-1 h-5 w-5 fill-zinc-400 text-zinc-400" />
          <span className="text-xs">3</span>
        </div> */}
        <a href={feedback.route} className="text-xs text-zinc-500 underline">
          {feedback.route}
        </a>
      </section>
      <section>
        <p className="my-2 text-sm leading-7 text-zinc-700">
          {capitalizeFirstLetter(feedback.content)}
        </p>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Button
              disabled={loading}
              onClick={() =>
                handleFeedbackStatus(
                  feedback.status === RESOLVED ? PENDING : RESOLVED,
                )
              }
              variant={"outline"}
              className="mr-2 h-auto rounded-full p-1"
            >
              <RotateCcw size={11} className="text-zinc-400" />
            </Button>
            <p className="text-zinc-500">
              {capitalizeFirstLetter(feedback.status)}
            </p>
          </div>
          <span className="italic text-zinc-500">
            {capitalizeFirstLetter(feedback.sentiment)}
          </span>
        </div>
      </section>
    </article>
  );
}
