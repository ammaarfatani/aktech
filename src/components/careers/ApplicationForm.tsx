"use client";

import { useState, type FormEvent } from "react";
import { Field, inputClass } from "@/components/forms/InquiryFields";
import type { JobListing } from "@/data/jobs";

export function ApplicationForm({ job, applyEnabled }: { job: JobListing; applyEnabled: boolean }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!applyEnabled) {
    return (
      <div id="apply" className="rounded-[1.75rem] border border-black/8 bg-[#F8F8F6] p-8">
        <h2 className="font-heading text-2xl font-extrabold">Applications are not live on this deployment</h2>
        <p className="mt-3 text-[#4B5563]">
          This role is marked as hiring, but private CV storage (Vercel Blob) is not configured. The form is withheld so files are never written to a public or temporary location.
        </p>
      </div>
    );
  }

  if (success) {
    return (
      <div id="apply" className="rounded-[1.75rem] border border-black/8 bg-[#F8F8F6] p-8">
        <h2 className="font-heading text-2xl font-extrabold">Application received</h2>
        <p className="mt-3 text-[#4B5563]">
          Thank you. AKTECH will review your application for {job.title}. If private CV storage is not configured on this deployment, the server will refuse the upload rather than store a file insecurely.
        </p>
      </div>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("position", job.slug);
    data.set("consent", (form.elements.namedItem("consent") as HTMLInputElement).checked ? "true" : "false");
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/careers", { method: "POST", body: data });
      const result = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || result.success !== true) throw new Error(result.error || "Could not submit the application.");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit the application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id="apply" onSubmit={onSubmit} className="mt-4 space-y-8 rounded-[1.75rem] border border-black/8 bg-white p-6 sm:p-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E0000B]">Application</p>
        <h2 className="mt-2 font-heading text-2xl font-extrabold">Apply for {job.title}</h2>
      </div>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.16em] sm:col-span-2">Contact</legend>
        <Field label="Full name"><input required name="fullName" className={inputClass} /></Field>
        <Field label="Email"><input required type="email" name="email" className={inputClass} /></Field>
        <Field label="Phone / WhatsApp"><input required name="phone" className={inputClass} /></Field>
        <Field label="Current city"><input name="location" className={inputClass} /></Field>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.16em] sm:col-span-2">Role</legend>
        <Field label="Position applied for">
          <input readOnly value={job.title} className={inputClass} />
        </Field>
        <Field label="Years of experience"><input name="experience" className={inputClass} /></Field>
        <Field label="Current employment status">
          <select name="employmentStatus" className={inputClass}>
            <option value="">Select</option>
            <option>Employed</option>
            <option>Notice period</option>
            <option>Available</option>
            <option>Student</option>
            <option>Prefer not to say</option>
          </select>
        </Field>
        <Field label="Availability / notice period"><input name="availability" className={inputClass} /></Field>
        <div className="sm:col-span-2">
          <Field label="Relevant skills"><textarea name="skills" rows={3} className={inputClass} /></Field>
        </div>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.16em] sm:col-span-2">Profiles & compensation</legend>
        <Field label="LinkedIn profile"><input name="linkedin" className={inputClass} /></Field>
        <Field label="Portfolio / GitHub"><input name="portfolio" className={inputClass} /></Field>
        <Field label="Current salary (optional)"><input name="currentSalary" className={inputClass} /></Field>
        <Field label="Expected salary (optional)"><input name="expectedSalary" className={inputClass} /></Field>
      </fieldset>

      <fieldset className="grid gap-5">
        <legend className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.16em]">Application materials</legend>
        <Field label="Cover letter">
          <textarea required minLength={20} name="coverLetter" rows={6} className={inputClass} />
        </Field>
        <Field label="CV / resume (PDF, DOC or DOCX, 5MB max)">
          <input required name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf" className="text-sm" />
        </Field>
      </fieldset>

      <label className="flex items-start gap-3 text-sm text-[#4B5563]">
        <input type="checkbox" name="consent" required className="mt-1" />
        I consent to AKTECH storing this application and CV privately for recruitment. CVs are not placed in a public folder.
      </label>
      <div className="hidden"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      {error && <p className="text-sm text-[#E0000B]">{error}</p>}
      <button disabled={submitting} className="rounded-full bg-[#E0000B] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white disabled:opacity-50">
        {submitting ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}
