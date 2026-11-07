import { NextRequest } from "next/server";
import { generateAIResponse } from "@/lib/aiAssistantEngine";

/**
 * POST /api/chat
 * Production AI Assistant Route for AKTech Digital Solutions.
 * Processes user inquiries with full site knowledge, page context awareness,
 * business recommendation engine, smart navigation links, and fallback webhook support.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body?.message;
    const currentPath = body?.currentPath || "/";
    const sessionId = body?.sessionId || "aktech-ai-session";

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json(
        { error: "Message is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();

    // 1. Check if external n8n webhook is configured
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        const n8nPayload = {
          action: "sendMessage",
          sessionId,
          chatInput: trimmedMessage,
          currentPath
        };

        const n8nResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(n8nPayload),
        });

        if (n8nResponse.ok) {
          const rawBody = await n8nResponse.text();
          let data: Record<string, unknown> | string;
          try {
            data = JSON.parse(rawBody);
          } catch {
            data = rawBody;
          }

          let reply: string | null = null;
          if (typeof data === "string") {
            reply = data;
          } else if (data && typeof data === "object") {
            reply =
              (data.output as string) ??
              (data.reply as string) ??
              (data.message as string) ??
              (data.text as string) ??
              (data.response as string) ??
              null;
          }

          if (reply && reply.trim().length > 0) {
            // Merge n8n response with smart links fallback
            const localFallback = generateAIResponse(trimmedMessage, { currentPath, sessionId });
            return Response.json({
              reply,
              smartLinks: localFallback.smartLinks || [],
              suggestedPrompts: localFallback.suggestedPrompts || []
            });
          }
        }
      } catch (webhookErr) {
        console.warn("[Chat API] n8n Webhook bypassed/failed, falling back to local AI engine:", webhookErr);
      }
    }

    // 2. High-Speed Native AI Knowledge Base & Reasoning Engine
    const aiResult = generateAIResponse(trimmedMessage, { currentPath, sessionId });

    return Response.json({
      reply: aiResult.reply,
      smartLinks: aiResult.smartLinks || [],
      suggestedPrompts: aiResult.suggestedPrompts || [],
      projectHighlights: aiResult.projectHighlights || [],
      leadCapturePrompt: aiResult.leadCapturePrompt || false
    });

  } catch (error) {
    console.error("[Chat API] Unexpected error:", error);
    return Response.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
