export const leadServices = ["Web Development", "Mobile Apps", "AI Agents & Automation", "CRM & Business Systems", "ERP Systems", "UI/UX Design", "SEO & Digital Growth"];
export function validateLead(value: unknown) {
 if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid request");
 const input = value as Record<string, unknown>;
 const limits: Record<string, number> = {fullName:120,email:254,phone:40,company:160,country:80,service:80,budget:80,timeline:80,description:5000,preferredContact:20,website:200,landingPath:200};
 const data: Record<string,string> = {};
 for (const [key,max] of Object.entries(limits)) {
  if (input[key] !== undefined && typeof input[key] !== "string") throw new Error("Invalid field");
  const text = String(input[key] ?? "").trim();
  if (text.length > max || /[\u0000-\u0008]/.test(text)) throw new Error("Field too long or invalid");
  data[key] = text;
 }
 if (!data.fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !data.country || data.description.length < 10) throw new Error("Provide your name, email, country and at least 10 characters about your project.");
 if (!leadServices.includes(data.service) || !["Email","WhatsApp","Phone"].includes(data.preferredContact)) throw new Error("Choose a service and contact method.");
 if (data.preferredContact !== "Email" && !/^[+()\d\s-]{7,40}$/.test(data.phone)) throw new Error("Provide a phone number for your preferred contact method.");
 if (!/^\/(?:[a-z0-9-]+\/?)*$/.test(data.landingPath)) data.landingPath = "/contact";
 return data;
}
export function consumeLimit(store: Map<string,{count:number;expires:number}>, key: string, now: number, maximum=5) {
 for (const [id,entry] of store) if(entry.expires <= now) store.delete(id);
 const entry=store.get(key);
 if(entry && entry.count >= maximum) return false;
 if(entry) entry.count++; else { if(store.size >= 10000) return false; store.set(key,{count:1,expires:now+15*60*1000}); }
 return true;
}
