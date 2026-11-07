"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Building, Calendar, ChevronDown, Clock, DollarSign, Globe, Mail, Phone, User } from "lucide-react";
import { submitInquiry } from "@/lib/submit-inquiry";
import { leadServices } from "@/lib/lead-validation";
import { trackConversion } from "@/lib/analytics";
import {
  CONSULTATION_BUDGETS,
  CONSULTATION_TIME_SLOTS,
  COUNTRIES,
  formatTimezoneLabel,
  timezonesForCountry,
} from "@/data/countries";

const topics = leadServices;
const inputClass =
  "w-full rounded-2xl border border-black/10 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium text-[#111111] outline-none transition-all placeholder:text-gray-400 focus:border-[#111111] focus:bg-white";
const selectClass = `${inputClass} appearance-none cursor-pointer pr-11`;

export function ConsultationRequest() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    timezone: "",
    topic: "",
    description: "",
    date: "",
    time: "",
    phone: "",
    budget: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const countryTimezones = useMemo(() => timezonesForCountry(form.country), [form.country]);
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function onCountryChange(country: string) {
    const nextTimezone = timezonesForCountry(country)[0] ?? "";
    setForm((current) => ({ ...current, country, timezone: nextTimezone }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) next.email = "A valid email is required";
    if (!form.country.trim()) next.country = "Country is required";
    if (!form.topic.trim()) next.topic = "Please choose a service";
    if (form.description.trim().length < 10) next.description = "Please tell us a little about the project.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitInquiry({
        fullName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        country: form.country.trim(),
        service: form.topic,
        description: [
          form.description.trim(),
          form.timezone ? `Timezone: ${formatTimezoneLabel(form.timezone)} (${form.timezone})` : "",
          form.date ? `Preferred date: ${form.date}` : "",
          form.time ? `Preferred time: ${form.time}` : "",
          form.budget ? `Budget range: ${form.budget}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
        preferredContact: form.phone.trim() ? "WhatsApp" : "Email",
        website: form.website,
        landingPath: "/book-consultation",
        inquiryType: "consultation",
      });
      trackConversion("generate_lead", form.topic);
      setSuccess(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again or email hello@aktech.tech.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-[1.75rem] border border-black/8 bg-[#F8F8F6] p-8">
        <h2 className="font-heading text-2xl font-extrabold">Thank you. Your consultation request has been received.</h2>
        <p className="mt-3 text-[#4B5563]">Our team will contact you shortly to agree the next useful step.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Full name" error={errors.name} icon={<User className="h-4 w-4" />}>
        <input
          className={inputClass}
          value={form.name}
          placeholder="e.g. Sara Ahmed"
          autoComplete="name"
          onChange={(event) => set("name", event.target.value)}
        />
      </Field>
      <Field label="Business name" icon={<Building className="h-4 w-4" />}>
        <input
          className={inputClass}
          value={form.company}
          placeholder="Company or brand name"
          autoComplete="organization"
          onChange={(event) => set("company", event.target.value)}
        />
      </Field>
      <Field label="Email" error={errors.email} icon={<Mail className="h-4 w-4" />}>
        <input
          className={inputClass}
          type="email"
          value={form.email}
          placeholder="you@company.com"
          autoComplete="email"
          onChange={(event) => set("email", event.target.value)}
        />
      </Field>
      <Field label="WhatsApp" icon={<Phone className="h-4 w-4" />}>
        <input
          className={inputClass}
          value={form.phone}
          placeholder="+92 300 0000000"
          autoComplete="tel"
          onChange={(event) => set("phone", event.target.value)}
        />
      </Field>
      <Field label="Country" error={errors.country} icon={<Globe className="h-4 w-4" />} select>
        <select
          className={`${selectClass} ${form.country ? "" : "text-gray-400"}`}
          value={form.country}
          onChange={(event) => onCountryChange(event.target.value)}
        >
          <option value="">Select your country</option>
          {COUNTRIES.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Service interested in" error={errors.topic} icon={<Building className="h-4 w-4" />} select>
        <select
          className={`${selectClass} ${form.topic ? "" : "text-gray-400"}`}
          value={form.topic}
          onChange={(event) => set("topic", event.target.value)}
        >
          <option value="">Select a service</option>
          {topics.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Preferred date" icon={<Calendar className="h-4 w-4" />}>
        <input
          className={`${inputClass} ${form.date ? "" : "text-gray-400"}`}
          type="date"
          min={minDate}
          value={form.date}
          onChange={(event) => set("date", event.target.value)}
        />
      </Field>
      <Field label="Preferred time" icon={<Clock className="h-4 w-4" />} select>
        <select
          className={`${selectClass} ${form.time ? "" : "text-gray-400"}`}
          value={form.time}
          onChange={(event) => set("time", event.target.value)}
        >
          <option value="">Select a time</option>
          {CONSULTATION_TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
          <option value="Flexible">Flexible</option>
        </select>
      </Field>
      <Field label="Timezone" icon={<Globe className="h-4 w-4" />} select>
        <select
          className={`${selectClass} ${form.timezone ? "" : "text-gray-400"}`}
          value={form.timezone}
          onChange={(event) => set("timezone", event.target.value)}
        >
          <option value="">{form.country ? "Select timezone" : "Select a country first"}</option>
          {countryTimezones.map((zone) => (
            <option key={zone} value={zone}>
              {formatTimezoneLabel(zone)}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Budget range (optional)" icon={<DollarSign className="h-4 w-4" />} select>
        <select
          className={`${selectClass} ${form.budget ? "" : "text-gray-400"}`}
          value={form.budget}
          onChange={(event) => set("budget", event.target.value)}
        >
          <option value="">Select a range</option>
          {CONSULTATION_BUDGETS.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider">Project description</span>
          <textarea
            className="w-full rounded-2xl border border-black/10 bg-gray-50 p-4 text-sm outline-none placeholder:text-gray-400 focus:border-[#111111] focus:bg-white"
            rows={5}
            value={form.description}
            placeholder="What should we discuss? The problem, tools you already use, and what a useful next step looks like."
            onChange={(event) => set("description", event.target.value)}
          />
          {errors.description && <span className="mt-1 block text-sm text-[#E0000B]">{errors.description}</span>}
        </label>
      </div>
      <div className="hidden">
        <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => set("website", event.target.value)} />
      </div>
      {submitError && <p className="sm:col-span-2 text-sm text-[#E0000B]">{submitError}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={submitting} className="rounded-full bg-[#E0000B] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white disabled:opacity-50">
          {submitting ? "Sending…" : "Request a consultation"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  icon,
  select,
  children,
}: {
  label: string;
  error?: string;
  icon: ReactNode;
  select?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider">{label}</span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400">{icon}</span>
        {children}
        {select && <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />}
      </span>
      {error && <span className="mt-1 block text-sm text-[#E0000B]">{error}</span>}
    </label>
  );
}
