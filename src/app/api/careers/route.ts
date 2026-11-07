import { createHash } from "node:crypto";
import { put } from "@vercel/blob";
import { consumeLimit } from "@/lib/lead-validation";
import { getJob } from "@/data/jobs";
import { allowedCv, blobConfigured, careersApplyEnabled } from "@/lib/careers";

export const runtime = "nodejs";

const limits = new Map<string, { count: number; expires: number }>();
const reply = (error: string, status: number) =>
  Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });

function field(form: FormData, key: string, max: number) {
  const value = String(form.get(key) ?? "").trim();
  if (value.length > max || /[\u0000-\u0008]/.test(value)) throw new Error("Invalid field");
  return value;
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply("Invalid origin", 403);
  if (!consumeLimit(limits, "careers-global", Date.now(), 40)) return reply("Please try again later", 429);
  if (!careersApplyEnabled()) {
    return reply("Applications are not open yet. Job details and private storage still need to be confirmed.", 503);
  }
  if (!blobConfigured()) return reply("Secure CV storage is not configured.", 503);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply("Unable to read the application", 400);
  }

  try {
    const fullName = field(form, "fullName", 120);
    const email = field(form, "email", 254);
    const phone = field(form, "phone", 40);
    const slug = field(form, "position", 80);
    const location = field(form, "location", 80);
    const experience = field(form, "experience", 40);
    const linkedin = field(form, "linkedin", 200);
    const portfolio = field(form, "portfolio", 200);
    const coverLetter = field(form, "coverLetter", 4000);
    const employmentStatus = field(form, "employmentStatus", 80);
    const skills = field(form, "skills", 800);
    const currentSalary = field(form, "currentSalary", 80);
    const expectedSalary = field(form, "expectedSalary", 80);
    const availability = field(form, "availability", 120);
    const consent = String(form.get("consent") ?? "");
    const website = field(form, "website", 200);
    if (website) return reply("Unable to submit this application", 400);
    if (!fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !phone || coverLetter.length < 20) {
      return reply("Provide your name, email, phone and a short cover letter.", 400);
    }
    if (consent !== "true") return reply("Consent is required to process this application.", 400);

    const job = getJob(slug);
    if (!job || job.status !== "open") return reply("This role is not open for applications.", 409);

    const cv = form.get("cv");
    if (!(cv instanceof File) || !allowedCv(cv)) {
      return reply("Upload a PDF, DOC or DOCX file of 5MB or less.", 400);
    }

    const key = createHash("sha256").update(`${email.toLowerCase()}:${slug}`).digest("hex");
    if (!consumeLimit(limits, key, Date.now(), 1)) {
      return reply("An application for this role from this email was already received recently.", 429);
    }

    const stamp = Date.now();
    const safeName = cv.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
    const cvPath = `careers/${slug}/${key}/${stamp}-${safeName}`;
    const recordPath = `careers/${slug}/${key}/${stamp}.json`;

    const cvBlob = await put(cvPath, cv, {
      access: "private",
      addRandomSuffix: false,
      contentType: cv.type || "application/octet-stream",
    });

    const record = {
      submittedAt: new Date(stamp).toISOString(),
      jobTitle: job.title,
      slug,
      fullName,
      email,
      phone,
      location,
      experience,
      linkedin,
      portfolio,
      coverLetter,
      employmentStatus,
      skills,
      currentSalary,
      expectedSalary,
      availability,
      cvPathname: cvBlob.pathname,
    };

    await put(recordPath, JSON.stringify(record), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json",
    });

    const notify = process.env.CAREERS_WEBHOOK_URL;
    if (notify?.startsWith("https://")) {
      await fetch(notify, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "career-application",
          jobTitle: job.title,
          slug,
          fullName,
          email,
          phone,
          location,
          experience,
          employmentStatus,
          skills,
          currentSalary,
          expectedSalary,
          availability,
          recordPathname: recordPath,
          cvPathname: cvBlob.pathname,
        }),
        signal: AbortSignal.timeout(12000),
        cache: "no-store",
      }).catch(() => undefined);
    }

    return Response.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return reply("Please check the application details and try again.", 400);
  }
}
