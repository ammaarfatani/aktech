"use client";

import { useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import type { JobListing } from "@/data/jobs";

export function ApplyViaEmail({ job }: { job: JobListing }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const subject = `Application for ${job.title} — AKTECH Digital Solutions`;
  const body = useMemo(
    () =>
      [
        `I am applying for ${job.title} at AKTECH Digital Solutions.`,
        "",
        "Full Name:",
        "Phone / WhatsApp:",
        "Current City:",
        "Relevant Experience:",
        "Skills:",
        "Portfolio / GitHub / LinkedIn:",
        "Current or Last Salary:",
        "Expected Salary:",
        "Availability / Notice Period:",
        "",
        "Cover Letter:",
        "",
        "I will attach my updated CV/Resume to this email before sending.",
      ].join("\n"),
    [job.title]
  );

  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div id="apply" className="rounded-[1.75rem] border border-black/8 bg-[#F8F8F6] p-6 sm:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E0000B]">Apply</p>
      <h2 className="mt-2 font-heading text-2xl font-extrabold">Apply via email</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
        Send your application to {siteConfig.email}. Attach your CV before sending. Opening your email app does not submit the application on its own.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full bg-[#111111] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-[#E0000B]"
        >
          Application instructions
        </button>
        <a href={mailto} className="rounded-full bg-[#E0000B] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-[#C00009]">
          Apply via Email
        </a>
      </div>

      {open && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/40 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="apply-title">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[1.5rem] bg-white p-6">
            <h3 id="apply-title" className="font-heading text-2xl font-extrabold">
              {job.title}
            </h3>
            <p className="mt-2 text-sm text-[#4B5563]">
              {job.location} · {job.workMode} · {job.employmentType}
            </p>
            <p className="mt-4 text-sm text-[#4B5563]">Include the following in your email, then attach your CV and send it to our recruitment team.</p>
            <ul className="mt-4 space-y-1 text-sm text-[#111111]">
              {[
                "Full Name",
                "Phone / WhatsApp",
                "Current City",
                "Relevant Experience",
                "Skills",
                "Portfolio / GitHub / LinkedIn",
                "Current or Last Salary",
                "Expected Salary",
                "Availability / Notice Period",
                "Cover Letter",
                "Updated CV / Resume attachment",
              ].map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              Recruitment email: <strong>{siteConfig.email}</strong>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mailto} className="rounded-full bg-[#E0000B] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white">
                Apply via Email
              </a>
              <button type="button" onClick={copyEmail} className="rounded-full border border-black/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em]">
                {copied ? "Copied" : "Copy email address"}
              </button>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#6B7280]">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
