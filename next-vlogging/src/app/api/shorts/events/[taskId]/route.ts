import { NextRequest } from "next/server";

import { getShortsTaskStatus } from "@/lib/server/shortsTaskQueue";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, context: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await context.params;
  const task = getShortsTaskStatus(taskId);

  if (!task) {
    return Response.json({ error: "Task not found" }, { status: 404 });
  }

  return Response.json(task);
}
