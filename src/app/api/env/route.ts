import { NextResponse, type NextRequest } from "next/server";

const Response = NextResponse;

const HYPERMODE_API_KEY = process.env.HYPERMODE_API_KEY;

export async function GET(request: NextRequest) {
  return Response.json({
    status: "success",
    message: "Working",
    key: HYPERMODE_API_KEY,
  });
}
