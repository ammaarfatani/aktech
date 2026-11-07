"use client";

import { PROCESS_STAGES } from "@/data/process";

export function ProcessJourney() {
  return (
    <div>
      <nav aria-label="Process stages" className="mb-4 grid grid-cols-2 overflow-hidden rounded-[1.5rem] border border-black/8 bg-white sm:grid-cols-3 lg:grid-cols-6">
        {PROCESS_STAGES.map((stage, index) => (
          <a
            key={stage.number}
            href={`#stage-${stage.number}`}
            className={`px-5 py-5 transition-colors hover:bg-[#F8F8F6] ${index !== 0 ? "border-t border-black/8 sm:border-t-0 sm:border-l" : ""}`}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E0000B]">{stage.number}</span>
            <span className="mt-2 block text-sm font-semibold text-[#111111]">{stage.stage}</span>
          </a>
        ))}
      </nav>

      <ol className="mt-16 divide-y divide-black/8 border-y border-black/8">
        {PROCESS_STAGES.map((stage) => (
          <li key={stage.number} id={`stage-${stage.number}`} className="scroll-mt-32 py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#E0000B]">
                  {stage.number} — {stage.stage}
                </p>
                <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#111111] sm:text-[2.15rem] sm:leading-[1.15]">
                  {stage.title}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="max-w-2xl text-lg leading-relaxed text-gray-600">{stage.description}</p>
                <div className="mt-12 grid gap-10 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#111111]">Activities</h3>
                    <ul className="space-y-3 text-sm leading-relaxed text-gray-600">
                      {stage.activities.map((item) => (
                        <li key={item} className="border-l-2 border-black/10 pl-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#111111]">Deliverables</h3>
                    <ul className="space-y-3 text-sm leading-relaxed text-gray-600">
                      {stage.deliverables.map((item) => (
                        <li key={item} className="border-l-2 border-[#E0000B]/40 pl-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
