import { NextResponse, type NextRequest } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

const Response = NextResponse;

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { feedbackId } = data;

  // check if feedback exists
  const feedback = await fetchQuery(api.feedback.fetchSingleFeedback, {
    id: feedbackId as Id<"feedback">,
  });

  if (feedback == null) {
    return Response.json({
      status: "error",
      message: "feedback does not exist",
      feedback: null,
    });
  } else {
    return Response.json({
      status: "success",
      message: "feedback found",
      feedback: feedback,
    });
  }
}
