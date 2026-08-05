import { NextRequest } from "next/server";

/**
 * POST /api/chat
 * Proxies user messages to the n8n AI Agent webhook,
 * keeping the webhook URL safely on the server side.
 *
 * n8n Chat Trigger nodes expect: { action, sessionId, chatInput }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body?.message;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json(
        { error: "Message is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("N8N_WEBHOOK_URL environment variable is not configured.");
      return Response.json(
        { error: "AI service is not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Build the request body in n8n Chat Trigger format
    // sessionId ties conversation history together per browser session
    const sessionId = body?.sessionId || "default-session";

    const n8nPayload = {
      action: "sendMessage",
      sessionId,
      chatInput: message.trim(),
    };

    console.log("[Chat API] Sending to n8n:", JSON.stringify(n8nPayload));

    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(n8nPayload),
    });

    // Read raw response body first for debugging
    const rawBody = await n8nResponse.text();
    console.log("[Chat API] n8n status:", n8nResponse.status);
    console.log("[Chat API] n8n raw response:", rawBody);

    if (!n8nResponse.ok) {
      console.error(`n8n webhook error (${n8nResponse.status}):`, rawBody);
      return Response.json(
        { error: "AI service is temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    // Try to parse as JSON; some n8n workflows return plain text
    let data: Record<string, unknown> | string;
    try {
      data = JSON.parse(rawBody);
    } catch {
      // n8n returned plain text — use it directly
      data = rawBody;
    }

    // Dynamically extract the AI response from various possible n8n fields
    let reply: string | null = null;

    if (typeof data === "string") {
      reply = data;
    } else if (data && typeof data === "object") {
      // Check common n8n response fields
      reply =
        (data.output as string) ??
        (data.reply as string) ??
        (data.message as string) ??
        (data.text as string) ??
        (data.response as string) ??
        (data.answer as string) ??
        null;

      // Some n8n workflows return an array — grab the first item's output
      if (!reply && Array.isArray(data)) {
        const first = data[0];
        if (first && typeof first === "object") {
          reply =
            (first as Record<string, unknown>).output as string ??
            (first as Record<string, unknown>).text as string ??
            (first as Record<string, unknown>).message as string ??
            null;
        }
      }
    }

    if (!reply) {
      console.error("[Chat API] Could not extract reply from n8n data:", JSON.stringify(data));
      return Response.json(
        { error: "Received an unexpected response from AI. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("[Chat API] Unexpected error:", error);
    return Response.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
