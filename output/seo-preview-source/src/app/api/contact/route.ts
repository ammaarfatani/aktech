import { createHash } from "node:crypto";
import { validateLead, consumeLimit } from "@/lib/lead-validation";
const limits = new Map<string,{count:number;expires:number}>();
const originalEndpoint = "https://script.google.com/macros/s/AKfycbxnxXMQOhp7NcD-jjS7G8DPjifEaIQGO_ee6Fm4zdZayS6Ga00tufIb67YSsIoFeaQoSQ/exec";
export const runtime = "nodejs";
const reply = (error: string,status: number) => Response.json({error},{status,headers:{"Cache-Control":"no-store"}});
export async function POST(request: Request) {
 if(request.headers.get("origin") !== new URL(request.url).origin) return reply("Invalid origin",403);
 if(!request.headers.get("content-type")?.includes("application/json")) return reply("Use JSON",415);
 if(!consumeLimit(limits,"global",Date.now(),100)) return reply("Please try again later",429);
 let data: ReturnType<typeof validateLead>;
 try {
  const reader=request.body?.getReader(); if(!reader) return reply("Missing request",400);
  const chunks: Uint8Array[]=[]; let size=0;
  while(true) { const {value,done}=await reader.read(); if(done) break; size+=value.byteLength; if(size>16000) {await reader.cancel();return reply("Request too large",413);} chunks.push(value); }
  data=validateLead(JSON.parse(Buffer.concat(chunks).toString("utf8")));
 } catch { return reply("Please check your name, email, country, service, contact method and project description (10–5000 characters).",400); }
 if(data.website) return reply("Unable to submit this request",400);
 const key=createHash("sha256").update(data.email.toLowerCase()).digest("hex");
 if(!consumeLimit(limits,key,Date.now())) return reply("Please try again later or contact us on WhatsApp",429);
 const endpoint=process.env.CONTACT_WEBHOOK_URL || originalEndpoint;
 if(!endpoint.startsWith("https://")) return reply("Contact delivery is unavailable",503);
 try {
  // One delivery attempt only: never retry an ambiguous response automatically.
  const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(data),signal:AbortSignal.timeout(15000),cache:"no-store"});
  if(!response.ok) return reply("Delivery could not be confirmed. Please contact us on WhatsApp before resending.",502);
  const result=await response.json();
  if(result?.success !== true && result?.status !== "success") return reply("Delivery could not be confirmed. Please contact us on WhatsApp before resending.",502);
  return Response.json({success:true},{headers:{"Cache-Control":"no-store"}});
 } catch { return reply("Delivery could not be confirmed. Please contact us on WhatsApp before resending.",502); }
}
