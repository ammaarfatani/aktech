export type InquiryPayload = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  country: string;
  service: string;
  budget?: string;
  timeline?: string;
  description: string;
  preferredContact?: "Email" | "WhatsApp" | "Phone";
  website?: string;
  landingPath: string;
  inquiryType?: "contact" | "estimate" | "consultation";
};

export async function submitInquiry(payload: InquiryPayload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      preferredContact: "Email",
      website: "",
      ...payload,
    }),
  });
  const result = (await response.json()) as { success?: boolean; error?: string };
  if (!response.ok || result.success !== true) {
    throw new Error(result.error || "Delivery could not be confirmed.");
  }
}
