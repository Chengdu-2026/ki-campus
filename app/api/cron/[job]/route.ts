import { NextResponse } from "next/server";
import { CRON_JOBS } from "@/lib/qm/cron";

/**
 * Schedulerneutrale Cron-Endpunkte (Vercel Cron, Task Scheduler, curl …).
 * Aufruf: GET /api/cron/<job> mit Header  Authorization: Bearer <CRON_SECRET>.
 */
export async function GET(req: Request, { params }: { params: Promise<{ job: string }> }) {
  const { job } = await params;
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }
  const handler = CRON_JOBS[job];
  if (!handler) return NextResponse.json({ error: "Unbekannter Job.", jobs: Object.keys(CRON_JOBS) }, { status: 404 });
  try {
    const result = await handler();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ job, error: String(error) }, { status: 500 });
  }
}
