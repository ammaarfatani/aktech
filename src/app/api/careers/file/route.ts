import { get } from "@vercel/blob";
import { blobConfigured } from "@/lib/careers";

export const runtime = "nodejs";

/**
 * Authorized CV retrieval. Never link this from public pages.
 * Authorization: Bearer CAREERS_ACCESS_SECRET
 */
export async function GET(request: Request) {
  const secret = process.env.CAREERS_ACCESS_SECRET;
  if (!secret || !blobConfigured()) {
    return Response.json({ error: "Not configured" }, { status: 503 });
  }
  const header = request.headers.get("authorization") || "";
  if (header !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const pathname = new URL(request.url).searchParams.get("pathname") || "";
  if (!pathname.startsWith("careers/") || pathname.includes("..")) {
    return Response.json({ error: "Invalid path" }, { status: 400 });
  }
  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200 || !result.stream) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return new Response(result.stream, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${pathname.split("/").pop()}"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
