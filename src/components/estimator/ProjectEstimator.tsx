"use client";

import { useMemo, useState } from "react";
import {
  BUSINESS_TYPES,
  BUDGET_RANGES,
  FEATURES_BY_TYPE,
  PROJECT_TYPES,
  TIMELINES,
  serviceForProjectType,
} from "@/data/estimator";
import { Field, inputClass, selectClass } from "@/components/forms/InquiryFields";
import { submitInquiry } from "@/lib/submit-inquiry";
import { trackConversion } from "@/lib/analytics";
import { COUNTRIES, formatTimezoneLabel, timezonesForCountry } from "@/data/countries";

const steps = ["Project type", "Features", "Project scope", "Budget & timeline", "Contact", "Review"];

export function ProjectEstimator() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<string>(PROJECT_TYPES[0].id);
  const [features, setFeatures] = useState<string[]>([]);
  const [businessType, setBusinessType] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [requirements, setRequirements] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const availableFeatures = FEATURES_BY_TYPE[projectType] ?? [];
  const projectLabel = PROJECT_TYPES.find((item) => item.id === projectType)?.label ?? projectType;
  const countryTimezones = useMemo(() => timezonesForCountry(country), [country]);

  const summary = useMemo(
    () =>
      [
        `Project type: ${projectLabel}`,
        features.length ? `Features: ${features.join(", ")}` : "Features: to be discussed",
        businessType ? `Business type: ${businessType}` : "",
        timeline ? `Timeline: ${timeline}` : "",
        budget ? `Budget: ${budget}` : "",
        timezone ? `Timezone: ${formatTimezoneLabel(timezone)} (${timezone})` : "",
        requirements ? `Additional requirements: ${requirements}` : "",
        description,
      ]
        .filter(Boolean)
        .join("\n"),
    [budget, businessType, description, features, projectLabel, requirements, timeline, timezone]
  );

  function toggleFeature(feature: string) {
    setFeatures((current) => (current.includes(feature) ? current.filter((item) => item !== feature) : [...current, feature]));
  }

  function onCountryChange(value: string) {
    setCountry(value);
    setTimezone(timezonesForCountry(value)[0] ?? "");
  }

  function validateStep() {
    const next: Record<string, string> = {};
    if (step === 2 && description.trim().length < 10) next.description = "Please describe the project in at least 10 characters.";
    if (step === 4) {
      if (!fullName.trim()) next.fullName = "Full name is required";
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) next.email = "A valid email is required";
      if (!country.trim()) next.country = "Country is required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit() {
    if (!validateStep()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitInquiry({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        country: country.trim(),
        service: serviceForProjectType(projectType),
        budget,
        timeline,
        description: summary,
        preferredContact: phone.trim() ? "WhatsApp" : "Email",
        landingPath: "/project-estimator",
        inquiryType: "estimate",
      });
      trackConversion("generate_lead", serviceForProjectType(projectType));
      trackConversion("project_estimator_submission", serviceForProjectType(projectType));
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
        <h2 className="font-heading text-2xl font-extrabold">Your project scope is ready for review.</h2>
        <p className="mt-3 text-[#4B5563]">
          Our team will prepare a tailored estimate from the details you shared. This form does not generate a price on its own.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ol className="mb-10 flex flex-wrap gap-2">
        {steps.map((label, index) => (
          <li
            key={label}
            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
              index === step ? "bg-[#E0000B] text-white" : "bg-black/5 text-[#6B7280]"
            }`}
          >
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {PROJECT_TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setProjectType(item.id);
                setFeatures([]);
              }}
              className={`rounded-2xl border px-5 py-5 text-left transition-colors ${
                projectType === item.id ? "border-[#E0000B] bg-[#E0000B]/5 shadow-[0_0_0_3px_rgba(224,0,11,0.08)]" : "border-black/10 hover:border-black/25"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {availableFeatures.map((feature) => (
            <button
              key={feature}
              type="button"
              onClick={() => toggleFeature(feature)}
              className={`rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-colors ${
                features.includes(feature) ? "border-[#E0000B] bg-[#E0000B]/5 text-[#111111]" : "border-black/10 text-[#4B5563]"
              }`}
            >
              {features.includes(feature) ? "● " : "○ "}
              {feature}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-5">
          <Field label="Business type" select>
            <select
              className={`${selectClass} ${businessType ? "" : "text-gray-400"}`}
              value={businessType}
              onChange={(event) => setBusinessType(event.target.value)}
            >
              <option value="">Select business type</option>
              {BUSINESS_TYPES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Brief description" error={errors.description}>
            <textarea
              className={inputClass}
              rows={5}
              value={description}
              placeholder="What are you building, who is it for, and what should it do first?"
              onChange={(event) => setDescription(event.target.value)}
            />
          </Field>
          <Field label="Additional requirements">
            <textarea
              className={inputClass}
              rows={3}
              value={requirements}
              placeholder="Integrations, languages, existing tools, or anything we should not miss"
              onChange={(event) => setRequirements(event.target.value)}
            />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Expected timeline" select>
            <select
              className={`${selectClass} ${timeline ? "" : "text-gray-400"}`}
              value={timeline}
              onChange={(event) => setTimeline(event.target.value)}
            >
              <option value="">Select a timeline</option>
              {TIMELINES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Budget range (optional)" select>
            <select
              className={`${selectClass} ${budget ? "" : "text-gray-400"}`}
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            >
              <option value="">Select a range</option>
              {BUDGET_RANGES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <p className="sm:col-span-2 text-sm text-[#6B7280]">
            Budget ranges here are discussion labels, not quotes. AKTECH prepares an estimate after review.
          </p>
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" error={errors.fullName}>
            <input
              className={inputClass}
              value={fullName}
              placeholder="e.g. Sara Ahmed"
              autoComplete="name"
              onChange={(event) => setFullName(event.target.value)}
            />
          </Field>
          <Field label="Business name">
            <input
              className={inputClass}
              value={company}
              placeholder="Company or brand name"
              autoComplete="organization"
              onChange={(event) => setCompany(event.target.value)}
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              className={inputClass}
              type="email"
              value={email}
              placeholder="you@company.com"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Field>
          <Field label="WhatsApp">
            <input
              className={inputClass}
              value={phone}
              placeholder="+92 300 0000000"
              autoComplete="tel"
              onChange={(event) => setPhone(event.target.value)}
            />
          </Field>
          <Field label="Country" error={errors.country} select>
            <select
              className={`${selectClass} ${country ? "" : "text-gray-400"}`}
              value={country}
              onChange={(event) => onCountryChange(event.target.value)}
            >
              <option value="">Select your country</option>
              {COUNTRIES.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Timezone" select>
            <select
              className={`${selectClass} ${timezone ? "" : "text-gray-400"}`}
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
            >
              <option value="">{country ? "Select timezone" : "Select a country first"}</option>
              {countryTimezones.map((zone) => (
                <option key={zone} value={zone}>
                  {formatTimezoneLabel(zone)}
                </option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {step === 5 && (
        <div className="rounded-[1.5rem] bg-[#F8F8F6] p-6 whitespace-pre-wrap text-sm leading-relaxed text-[#4B5563]">
          {summary}
          {"\n"}
          Contact: {fullName} · {email} · {country}
          {company ? ` · ${company}` : ""}
        </div>
      )}

      {submitError && <p className="mt-4 text-sm text-[#E0000B]">{submitError}</p>}

      <div className="mt-8 flex flex-wrap gap-3">
        {step > 0 && (
          <button type="button" className="rounded-full border border-black/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em]" onClick={() => setStep((value) => value - 1)}>
            Back
          </button>
        )}
        {step < 5 && (
          <button
            type="button"
            className="rounded-full bg-[#111111] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
            onClick={() => {
              if (!validateStep()) return;
              setStep((value) => value + 1);
            }}
          >
            Continue
          </button>
        )}
        {step === 5 && (
          <button
            type="button"
            disabled={submitting}
            className="rounded-full bg-[#E0000B] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white disabled:opacity-50"
            onClick={submit}
          >
            {submitting ? "Sending…" : "Submit for review"}
          </button>
        )}
      </div>
    </div>
  );
}
