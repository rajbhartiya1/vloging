export type ShortsEventType = "view" | "like" | "share" | "comment";

type QueueTaskInput = {
  videoId: string;
  eventType: ShortsEventType;
  metadata?: Record<string, unknown>;
};

type TaskStatus = "queued" | "processing" | "completed" | "failed";

type TaskRecord = {
  id: string;
  status: TaskStatus;
  input: QueueTaskInput;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
  error: string | null;
  result: Record<string, unknown> | null;
};

const MAX_CONCURRENCY = 4;
const MAX_STORED_TASKS = 1200;

const queue: string[] = [];
const tasks = new Map<string, TaskRecord>();
let runningWorkers = 0;

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

async function processHeavyTask(input: QueueTaskInput): Promise<Record<string, unknown>> {
  const baseDelay = 120;
  const extraDelay = Math.floor(Math.random() * 250);

  // Simulate heavy operations like writing analytics, fan-out webhooks, and enrichment.
  await new Promise((resolve) => {
    setTimeout(resolve, baseDelay + extraDelay);
  });

  return {
    videoId: input.videoId,
    eventType: input.eventType,
    acceptedAt: Date.now(),
  };
}

function cleanupTaskStore(): void {
  if (tasks.size <= MAX_STORED_TASKS) {
    return;
  }

  const ordered = [...tasks.values()].sort((a, b) => a.createdAt - b.createdAt);
  const removable = ordered.slice(0, tasks.size - MAX_STORED_TASKS);
  for (const task of removable) {
    tasks.delete(task.id);
  }
}

async function runNextTask(): Promise<void> {
  if (runningWorkers >= MAX_CONCURRENCY || queue.length === 0) {
    return;
  }

  const id = queue.shift();
  if (!id) {
    return;
  }

  const record = tasks.get(id);
  if (!record) {
    return;
  }

  runningWorkers += 1;
  record.status = "processing";
  record.startedAt = Date.now();

  try {
    const result = await processHeavyTask(record.input);
    record.status = "completed";
    record.result = result;
  } catch (error) {
    record.status = "failed";
    record.error = error instanceof Error ? error.message : "Unexpected processing error";
  } finally {
    record.finishedAt = Date.now();
    tasks.set(record.id, record);
    runningWorkers -= 1;
    void runQueue();
  }
}

async function runQueue(): Promise<void> {
  cleanupTaskStore();

  while (runningWorkers < MAX_CONCURRENCY && queue.length > 0) {
    void runNextTask();
  }
}

export function enqueueShortsEvent(input: QueueTaskInput): string {
  const id = createId();
  const record: TaskRecord = {
    id,
    status: "queued",
    input,
    createdAt: Date.now(),
    startedAt: null,
    finishedAt: null,
    error: null,
    result: null,
  };

  tasks.set(id, record);
  queue.push(id);
  void runQueue();

  return id;
}

export function getShortsTaskStatus(taskId: string): TaskRecord | null {
  return tasks.get(taskId) ?? null;
}

export const shortsSupportedEvents: ShortsEventType[] = ["view", "like", "share", "comment"];
