import { NextResponse, type NextRequest } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { PENDING } from "@/lib/constants";

const Response = NextResponse;

export async function GET(request: NextRequest) {
  return Response.json({
    status: "success",
    message: "Working",
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const {
    projectId,
    by,
    content,
    location,
    country_code,
    type,
    route,
    sentiment,
  } = data;

  // check if project exists before creating feedback
  const project = await fetchQuery(api.project.fetchSingleProject, {
    id: projectId as Id<"projects">,
  });

  if (project == null) {
    return Response.json({
      status: "no_such_project",
      message: "project does not exist",
    });
  }

  const result = await fetchMutation(api.feedback.createFeedbackForProject, {
    projectId: projectId,
    by: by as string,
    content: content as string,
    location: location as string,
    country_code: country_code as string,
    type: type as string,
    route: route as string,
    status: PENDING, // pending by default
    sentiment: sentiment as string,
  });

  if (result !== null) {
    return Response.json({
      status: "success",
      message: "Feedback created successfully",
      feedbackId: result,
    });
  } else {
    return Response.json({
      status: "error",
      message: "Feedback could not be created",
      feedbackId: null,
    });
  }
}
