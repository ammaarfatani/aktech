"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { jobs, type JobListing } from "@/data/jobs";
import { siteConfig } from "@/config/site";

export function CareersBoard() {
  const [department, setDepartment] = useState("All");
  const [query, setQuery] = useState("");
  const departments = ["All", ...Array.from(new Set(jobs.map((job) => job.department)))];

  const visible = useMemo(() => {
    return jobs.filter((job) => {
      if (job.status !== "open") return false;
      const departmentMatch = department === "All" || job.department === department;
      const haystack = `${job.title} ${job.department} ${job.summary} ${job.skills.join(" ")}`.toLowerCase();
      return departmentMatch && haystack.includes(query.trim().toLowerCase());
    });
  }, [department, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search roles or skills"
          className="flex-1 rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E0000B]/15"
        />
        <select
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          className="rounded-2xl border border-black/10 px-4 py-3 text-sm sm:w-64"
        >
          {departments.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <ul className="mt-8 grid gap-4 lg:grid-cols-2">
        {visible.map((job) => (
          <JobRow key={job.slug} job={job} />
        ))}
      </ul>
    </div>
  );
}

function JobRow({ job }: { job: JobListing }) {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Application for ${job.title} — AKTECH Digital Solutions`)}`;
  return (
    <li className="flex flex-col justify-between rounded-[1.5rem] border border-black/8 bg-white p-6 transition-colors hover:border-[#E0000B]/30">
      <div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#E0000B]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#E0000B]">
            Actively hiring
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6B7280]">{job.department}</span>
        </div>
        <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-tight">{job.title}</h3>
        <p className="mt-2 text-sm text-[#4B5563]">
          {job.location} · {job.workMode} · {job.employmentType}
        </p>
        <p className="mt-3 text-sm text-[#4B5563]">{job.summary}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/careers/${job.slug}`} className="rounded-full bg-[#111111] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white hover:bg-[#E0000B]">
          View details
        </Link>
        <a href={mailto} className="rounded-full border border-black/10 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] hover:border-[#E0000B] hover:text-[#E0000B]">
          Apply now
        </a>
      </div>
    </li>
  );
}
